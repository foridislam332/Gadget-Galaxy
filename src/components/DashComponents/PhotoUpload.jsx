import { FaCloudUploadAlt } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

const PhotoUpload = ({ files, setFiles, photoUrls, setPhotoUrls }) => {
    const generateImgUrl = (file) => {
        const url = URL.createObjectURL(file);
        return url;
    };

    const multipleFilesUpload = (e) => {
        const selectedFiles = e.target.files;
        for (let index = 0; index < selectedFiles.length; index++) {
            const file = selectedFiles[index];
            const url = generateImgUrl(file);
            let id = "id" + Math.random().toString(16).slice(2);
            setFiles((prevFiles) => [...prevFiles, { id, image: url, file }]);
        }
    };

    const handleRemove = (name) => {
        const obj = files?.filter((item) => item?.file?.name !== name);
        setFiles(obj);
    };

    const handleRemoveOld = (index) => {
        const obj = photoUrls?.filter((item, i) => i !== index);
        setPhotoUrls(obj);
    };

    const isPhoto = files.length > 0 || photoUrls.length > 0 ? true : false;
    return (
        <div className={`${isPhoto && 'flex flex-wrap gap-3'}`}>
            {photoUrls.map((image, index) => (
                <div key={index} className='max-h-56 max-w-32 md:max-w-56 relative group'>
                    <img src={image} alt={`Uploaded ${index + 1}`} className="w-full h-full object-cover object-top rounded" />
                    <button onClick={() => handleRemoveOld(index)} className='absolute top-2 right-2 h-8 w-8 rounded-full bg-red flex items-center justify-center text-white opacity-0 group-hover:opacity-100 invisible group-hover:visible duration-300'>
                        <IoClose size='20' />
                    </button>
                </div>
            ))}
            {files.map((image, index) => (
                <div key={index} className='max-h-56 max-w-32 md:max-w-56 relative group'>
                    <img src={image.image} alt={`Uploaded ${index + 1}`} className="w-full h-full object-cover object-top rounded" />
                    <button onClick={() => handleRemove(image?.file?.name)} className='absolute top-2 right-2 h-8 w-8 rounded-full bg-red flex items-center justify-center text-white opacity-0 group-hover:opacity-100 invisible group-hover:visible duration-300'>
                        <IoClose size='20' />
                    </button>
                </div>
            ))}

            <div className={`border-dashed border-2 border-lightGray bg-white ${isPhoto ? 'h-32 md:h-56 w-56' : 'h-44 w-full'} flex items-center justify-center rounded`}>
                <input
                    id="picture"
                    name="picture"
                    type="file"
                    accept="image/*"
                    onChange={multipleFilesUpload}
                    multiple
                    className="w-full hidden focus:outline-none border-none p-[10px] text-darkBlue placeholder:text-darkBlue"
                />
                <button
                    type="button"
                    onClick={() => document.getElementById('picture').click()}
                    className="flex flex-col items-center gap-3 flex-wrap justify-center text-primary"
                >
                    <FaCloudUploadAlt size={files.length > 0 || photoUrls.length > 0 ? '40' : '40'} className="text-blue" />
                    <p className={`bg-lightGray text-white px-4 py-2`}>Click to select photo</p>
                </button>
            </div>
        </div>
    );
};

export default PhotoUpload;