"use client";

import React from "react";
import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";
import MyButton from "./MyButton";
import { deletePost } from "@/server/posts";
import { useRouter } from "next/navigation";

export default function PostCard({ post }) {
	const router = useRouter();
	const sil = async () => {
		await deletePost(post._id);
	};
	return (
		<Card className="py-4">
			<CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
				<h4 className="font-bold text-large">{post.baslik}</h4>
				<small className="text-default-500">{post.metin}</small>
			</CardHeader>
			<CardBody className="overflow-visible py-2">
				<div className="w-40 h-40">
					<Image
						alt="Card background"
						className="object-cover rounded-xl"
						src={post.resim ? `/uploads/${post.resim}` : "/noimage.png"}
						width={270}

					/>
				</div>

				<div className="flex gap-x-5 mt-2">
					<MyButton color="danger" onClick={sil}>
						Sil
					</MyButton>
					<MyButton color="success" onClick={() => router.push("/post/ekle/" + post._id)}>
						Düzenle
					</MyButton>
				</div>
			</CardBody>
		</Card>
	);
}
