import styles from './ImageUpload.module.css'

const uploadUrl = import.meta.env.VITE_CLOUDINARY_URL
const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET

const ImageUpload = ({ name, label, upload_image, handleImageUpload }) => {

    const handleSelectImage = async (evt) => {
        const formData = new FormData()
        const file = (evt.target.files[0])

        formData.append('file', file)
        formData.append('upload_preset', uploadPreset)

        try {
            const res = await fetch(uploadUrl, {
                method: 'POST',
                body: formData
            })
        const imageData = await res.json()
        handleImageUpload(imageData.secure_url)
        } catch (error) {
        console.log('Error uploading to Cloudinary:', error)
        }
    }

    return (
        <div className={styles.imageUploadContainer}>
            <label htmlFor={name} className={styles.imageUploadLabel}>{label}</label>
            <input
                type="file"
                name={name}
                id={name}
                accept='image/*'
                onChange={handleSelectImage}
                className={styles.imageUploadInput}
            />
            {upload_image && (
                <div className={styles.imagePreviewContainer}>
                    <img 
                        src={upload_image} 
                        alt="Uploaded preview" 
                        className={styles.imagePreview}
                    />
                </div>
            )}
        </div>
    )
}

export default ImageUpload