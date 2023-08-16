"use client";

import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

const PromptCard = ({ post, handleEdit, handleDelete, handleTagClick }) => {
  const { data: session } = useSession();
  const pathName = usePathname();
  const router = useRouter();

  const handleProfileClick = () => {
    console.log(post);

    if (post.creator._id === session?.user.id) return router.push("/profile");

    router.push(`/profile/${post.creator._id}?name=${post.creator.username}`);
  };

  return (
    <div className="prompt_card my-4 ">
      <div className="items-start gap-5">
        <div
          className=" flex justify-start items-center gap-3 cursor-pointer"
          onClick={handleProfileClick}
        >
          <Image
            src={post.creator.image}
            alt="user_image"
            width={80}
            height={80}
            className="rounded-full -mt-4 object-contain"
          />

          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-gray-900">
              Name: {post.creator.username}
            </h3>
            <p className="font-inter text-sm text-gray-500">
              Email: {post.creator.email}
            </p>
            <p className="my-4 font-satoshi text-sm text-gray-700">
              {" "}
              Phone: {post.prompt}
            </p>

            <p
              className="font-inter text-sm blue_gradient cursor-pointer -mt-4"
              onClick={() => handleTagClick && handleTagClick(post.tag)}
            >
              Location: {post.tag}
            </p>
          </div>
        </div>
      </div>

      {/* {session?.user.id === post.creator._id && pathName === "/profile" && (
        <div className="mt-5 flex-center gap-4 border-t border-gray-100 pt-3">
          <p
            className="font-inter text-sm green_gradient cursor-pointer"
            onClick={handleEdit}
          >
            Edit
          </p>
          <p
            className="font-inter text-sm orange_gradient cursor-pointer"
            onClick={handleDelete}
          >
            Delete
          </p>
        </div>
      )} */}
      <div className="mt-5 flex-center gap-4 border-t border-gray-100 pt-3">
        <p
          className="font-inter text-sm green_gradient cursor-pointer"
          onClick={handleEdit}
        >
          Edit
        </p>
        <p
          className="font-inter text-sm orange_gradient cursor-pointer"
          onClick={handleDelete}
        >
          Delete
        </p>
      </div>
    </div>
  );
};

export default PromptCard;
