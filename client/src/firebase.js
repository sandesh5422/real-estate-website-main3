import { v2 as cloudinary } from 'cloudinary';

(async function() {

    // Configuration
    cloudinary.config({ 
        cloud_name: 'dfyzhdmdy', 
        api_key: '488358458695557', 
        api_secret: 'rUHIdA2Sx6XjNlLD9eX_pPFM_M4>' // Click 'View API Keys' above to copy your API secret
    });
    
    // Upload an image
     const uploadResult = await cloudinary.uploader
       .upload(
           'https://www.bing.com/ck/a?!&&p=709c36f1f0875a99a6f0f0c8cc63d47ad60e49f90d79b84386baa2a9d5bdf6f0JmltdHM9MTc0Mjg2MDgwMA&ptn=3&ver=2&hsh=4&fclid=36ec9c8e-f752-6143-23a4-88b0f6e060df&u=a1L2ltYWdlcy9zZWFyY2g_cT1yZWFsJTIwZXN0YXRlJTIwaW1hZ2VzJTIwZnJlZSZGT1JNPUlRRlJCQSZpZD1BRkY5RjNCMUQ3NDM1Q0EzQ0RERkU3QjkxNTc2OUFENEE0Mjg5MjFB&ntb=1', {
               public_id: 'property',
           }
       )
       .catch((error) => {
           console.log(error);
       });
    
    console.log(uploadResult);
    
    // Optimize delivery by resizing and applying auto-format and auto-quality
    const optimizeUrl = cloudinary.url('property', {
        fetch_format: 'auto',
        quality: 'auto'
    });
    
    console.log(optimizeUrl);
    
    // Transform the image: auto-crop to square aspect_ratio
    const autoCropUrl = cloudinary.url('Property', {
        crop: 'auto',
        gravity: 'auto',
        width: 500,
        height: 500,
    });
    
    console.log(autoCropUrl);    
})();
// Initialize cloudinary
export const app = initializeApp(firebaseConfig);