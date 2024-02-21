import PostCard from "@/components/PostCard";
import { getPosts } from "@/server/posts";

export default async function page() {
	const posts = await getPosts();
	return (
		<div className="grid grid-cols-3 gap-5 p-5">
			{posts.map(post => (
				<PostCard key={post._id} post={post} />
			))}
		</div>
	);
}
