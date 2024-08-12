const uploadFile = async (file) => {

    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

    // Debugging line to check if the environment variable is loaded correctly
    console.log("Cloudinary Cloud Name:", cloudName);

    const url = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "chat-app-file");

    try {
        const response = await fetch(url, {
            method: "POST",
            body: formData,
        });

        if (!response.ok) {
            throw new Error("Failed to upload image");
        }

        const responseData = await response.json();
        return responseData.secure_url; // Return the URL of the uploaded image
    } catch (error) {
        console.error("Error uploading file:", error);
        return null;
    }
};

export default uploadFile;
