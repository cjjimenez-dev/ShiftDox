require 'cloudconvert'

class ConversionsController < ApplicationController
  def create
    file = params[:file]
    target_format = params[:target_format]

    if file.blank?
      return render json: { error: 'No file uploaded' }, status: :unprocessable_entity
    end

    if ENV['CLOUDCONVERT_API_KEY'].blank? || ENV['CLOUDCONVERT_API_KEY'] == 'YOUR_API_KEY_HERE'
      return render json: { error: 'Backend Error: Please add your CloudConvert API key to backend/.env' }, status: :internal_server_error
    end

    begin
      CloudConvert.configure do |config|
        config.api_key = ENV['CLOUDCONVERT_API_KEY']
      end

      # Create the CloudConvert Job
      job = CloudConvert::Job.create(
        tasks: {
          'import-it': {
            operation: 'import/upload'
          },
          'convert-it': {
            operation: 'convert',
            input: 'import-it',
            output_format: target_format
          },
          'export-it': {
            operation: 'export/url',
            input: 'convert-it'
          }
        }
      )

      # Upload the file directly to CloudConvert
      upload_task = job.tasks.find { |t| t.name == 'import-it' }
      CloudConvert::Task.upload(
        file: file.tempfile.path,
        task: upload_task
      )

      # Wait for the job to finish (polling)
      job = CloudConvert::Job.wait(job.id)

      # Get the export task to find the secure download URL
      export_task = job.tasks.find { |t| t.name == 'export-it' }
      
      if export_task.status == "finished"
        file_url = export_task.result.files.first.url
        render json: { 
          status: 'completed',
          download_url: file_url
        }, status: :ok
      else
        render json: { error: 'Conversion failed on CloudConvert servers' }, status: :internal_server_error
      end

    rescue => e
      render json: { error: e.message }, status: :internal_server_error
    end
  end

  def download
    # Since CloudConvert returns a secure, direct download URL, this local endpoint is deprecated.
    render json: { error: "Direct downloads are handled by CloudConvert URLs." }, status: :not_found
  end
end
