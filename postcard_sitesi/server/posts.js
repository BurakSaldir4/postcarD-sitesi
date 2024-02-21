"use server";

import connectDb from "@/lib/db";
import Post from "@/models/Post";
import { writeFile } from "fs/promises";
import { revalidateTag } from "next/cache";
import path from "path";

connectDb();

async function resimYukle(resim) {
	if (resim.size > 0) {
		const bytes = await resim.arrayBuffer();
		const buffer = Buffer.from(bytes);
		const yol = path.join(process.cwd(), "/public/uploads/", resim.name);
		await writeFile(yol, buffer);
	}
}

export async function createPost(fd) {
	const baslik = fd.get("baslik");
	const metin = fd.get("metin");
	const resim = fd.get("resim");
	
	resimYukle(resim);
	try {
		if (baslik.trim() === "" || metin.trim() === "") return "Bütün alanları doldurunuz!";
		const newPost = new Post({ baslik, metin, resim: resim.name === "undefined" ? "" : resim.name });
		await newPost.save();
		revalidateTag("posts");
	} catch (error) {
		return error.message;
	}
}

export async function getPosts() {
	try {
		const posts = await Post.find();
		return posts;
	} catch (error) {
		return error.message;
	}
}

export async function getPost(id) {
	try {
		const post = await Post.findById(id);
		return post;
	} catch (error) {
		return error.message;
	}
}

export async function updatePost(fd, id) {
	const baslik = fd.get("baslik");
	const metin = fd.get("metin");
	const resim = fd.get("resim");
	resimYukle(resim);
	try {
		if (baslik.trim() === "" || metin.trim() === "") {
			return "Bütün alanları doldurunuz!";
		}

		if (resim.size > 0) await Post.findByIdAndUpdate(id, { baslik, metin, resim: resim.name }, { runValidators: true });
		else await Post.findByIdAndUpdate(id, { baslik, metin }, { runValidators: true });
		revalidateTag("posts");
	} catch (error) {
		return error.message;
	}
}

export async function deletePost(id) {
	try {
		await Post.findByIdAndDelete(id);

		revalidateTag("posts");
	} catch (error) {
		return error.message;
	}
}
