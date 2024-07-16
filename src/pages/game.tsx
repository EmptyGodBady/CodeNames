import Card from "@/components/Card";
import CopyTextButton from "@/components/Card/coppyLinkButton";
import TeamColumn from "@/components/lobby/TeamColumn";

export default function Page() {
  return (
    <main className="min-h-screen bg-[#114357] flex flex-col text-white">
      <header className="h-8 flex justify-between m-2">
        <div>
          <CopyTextButton />
        </div>
        <div>Name</div>
      </header>
      <div className="flex justify-between">
        <TeamColumn ident={"1"} />
        {/* 1. Добавить юзера в локалсторедж после нажатия на сабмит входа в
        комнату 2. Передать в комнату идентифаер 3. Внутри метода в комнате
        обратиться к локалстореджу и забрать имя в переменную 4. Вкинуть
        идентифаер и имя внутрь фетча на assignTeam (don't forget to change
        method from POST TO PUT)  */}
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
        <TeamColumn ident="2" />
      </div>
    </main>
  );
}
