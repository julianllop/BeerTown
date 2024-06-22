import { FaRegImage } from "react-icons/fa6";

const Skeleton = () => {
    return (
        <div className="w-[250px] h-[350px] shadow-md rounded-md flex flex-col justify-between items-start cursor-pointer hover:shadow-lg">
            <div className="w-full h-[200px] flex justify-center items-center bg-blue-gray-200 rounded-t-md shadow-md  text-4xl text-blue-gray-50 animate-pulse">
                <FaRegImage />
            </div>
            <div className="p-4 w-full flex flex-col gap-2">
                <div className="h-8 w-full bg-blue-gray-200 rounded-md animate-pulse"></div>
                <div className="h-6 w-[40%] bg-blue-gray-200 rounded-md animate-pulse"></div>
                <div className="h-6 w-[20%] bg-blue-gray-200 rounded-md animate-pulse"></div>
            </div>
        </div>
    );
};

export default Skeleton;
