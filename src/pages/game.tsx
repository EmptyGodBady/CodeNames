import Card from "@/components/Card";
import CopyTextButton from "@/components/Card/coppyLinkButton";

export default function Page() {
  return (
    <main className="min-h-screen bg-[#114357] flex flex-col">
      <header className="h-8 flex justify-between m-2">
        <div>
          <CopyTextButton />
        </div>
        <div>Name</div>
      </header>
      <div className="flex justify-between">
        <div className="h-[600px] w-[100px] border flex flex-col justify-between">
          <div>sfs</div>
          <div>sfs</div>
        </div>
        <div className="flex w-[900px] h-[600px] flex-wrap content-start ">
          <Card></Card>
          <Card></Card>
          <Card></Card>
          <Card></Card>
          <Card></Card>
          <Card></Card>
          <Card></Card>
          <Card></Card>
          <Card></Card>
          <Card></Card>
          <Card></Card>
          <Card></Card>
          <Card></Card>
          <Card></Card>
          <Card></Card>
          <Card></Card>
          <Card></Card>
          <Card></Card>
          <Card></Card>
          <Card></Card>
        </div>
        <div className="h-[600px] w-[100px] border flex flex-col justify-between">
          <div>sfs</div>
          <div>sfs</div>
        </div>
      </div>
    </main>
  );
}
