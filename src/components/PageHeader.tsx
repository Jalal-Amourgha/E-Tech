"use client";

const PageHeader = ({ name }: { name: string }) => {
  return (
    <div className="flex items-center gap-5 text-xl text-gray mt-100  mb-20 container">
      <p>Home</p>
      <p>/</p>
      <p className="text-black">{name}</p>
    </div>
  );
};

export default PageHeader;
