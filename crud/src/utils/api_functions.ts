import API_URL from "@/backend_url";
import { TNote } from "@/types/note";

const getData = async (): Promise<TNote[]> => {
  const url = API_URL;
  const response = await fetch(url)
  if (!response.ok) {
    return [];
  }
  return await response.json();

}

const postData = async (content: string) => {
  const url = API_URL;
  const payload = JSON.stringify({ "content": content });
  await fetch(url, { method: "POST", body: payload }).then(response => console.log(response.status)).catch(error => console.log(error));
}

const deleteData = async (id: number) => {
  const url = new URL(id.toString(), API_URL);
  await fetch(url, { method: "DELETE" }).then(response => console.log(response.status)).catch(error => console.log(error));
}

export { getData, postData, deleteData }