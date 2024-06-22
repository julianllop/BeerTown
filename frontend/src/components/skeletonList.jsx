import Skeleton from "./skeleton";

const SkeletonList = () => {
    return (
        <div className="grid grid-cols-auto justify-items-center items-center justify-between w-full gap-8">
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
        </div>
    );
};

export default SkeletonList;
