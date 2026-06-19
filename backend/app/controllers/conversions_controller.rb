class ConversionsController < ApplicationController
  def create
    file = params[:file]
    target_format = params[:target_format]

    if file.present?
      # TODO: Phase 2 - Implement actual conversion logic (LibreOffice / API)
      # Mocking a successful conversion for now so the UI works
      
      render json: { 
        status: 'completed',
        download_url: "http://localhost:3000/api/download/mock-file-123" 
      }, status: :ok
    else
      render json: { error: 'No file uploaded' }, status: :unprocessable_entity
    end
  end

  def download
    # TODO: Phase 2 - Return the actual converted file from ActiveStorage
    
    # Mocking file download
    send_data "Mock converted file content", filename: "converted_file.txt"
  end
end
