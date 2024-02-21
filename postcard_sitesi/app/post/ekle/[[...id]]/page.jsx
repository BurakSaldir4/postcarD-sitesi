"use client";
import toast from "react-hot-toast";
import MyButton from "@/components/MyButton";
import { createPost, getPost, updatePost } from "@/server/posts";
import { Input } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function page({ params }) {
  const router = useRouter();
  const [post, setPost] = useState();
  const [baslik, setBaslik] = useState("");
  const [metin, setMetin] = useState("");

  const ekle = async (fd) => {
    const hata = await createPost(fd);
    if (hata) toast.error(hata);
    else {
      toast.success("Post eklendi.");
      router.push("/");
    }
  };
  const duzenle = async (fd, id) => {
    const hata = await updatePost(fd, id);
    if (hata) toast.error(hata);
    else {
      toast.success("Post düzenlendi.");
      router.push("/");
    }
  };

  const getir = async (id) => {
    const data = await getPost(id);
    setBaslik(data.baslik);
    setMetin(data.metin);
    setPost(data);
  };

  useEffect(() => {
    if (params.id?.length === 1) {
      getir(params.id[0]);
    }
  });

  return (
    <form
      className="flex flex-col space-y-2"
      action={(fd) => {
        if (params.id?.length === 1) duzenle(fd, params.id);
        else ekle(fd);
      }}
    >
      <Input
        name="baslik"
        label="Başlık"
        value={baslik}
        onChange={(e) => setBaslik(e.target.value)}
      />
      <Input
        name="metin"
        label="Metin"
        value={metin}
        onChange={(e) => setMetin(e.target.value)}
      />
      <input type="file" name="resim" />
      <MyButton variant="ghost" type="submit">
        Gönder
      </MyButton>
    </form>
  );
}
