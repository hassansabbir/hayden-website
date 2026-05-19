import Reserve from "./Reserve";
import Submit from "./Submit";

const page = async ({ searchParams }: { searchParams: any }) => {
  const { isSubmit } = await searchParams;

  return (
    <div>
      {isSubmit == "true" ? <Submit /> : <Reserve />}
    </div>
  );
};

export default page;