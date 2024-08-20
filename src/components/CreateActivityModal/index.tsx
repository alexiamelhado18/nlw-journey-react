import { Calendar, Clock, Tag, X } from "lucide-react";
import { ChangeEvent, FormEvent, useState } from "react";
import { Button } from "../Button";
import { api } from "../../utils/api";
import { useParams } from "react-router-dom";

interface CreateActivityModalProps {
    closeCreateActivityModal: () => void,
}

export function CreateActivityModal({
    closeCreateActivityModal
}: CreateActivityModalProps) {

    //const [date, setDate] = useState("");
    //const [time, setTime] = useState("");

    const { tripId } = useParams();

    function changeToDateFormat(date: ChangeEvent<HTMLInputElement>) {
        // Remove caracteres não numéricos
        let valueDate = date.target.value.replace(/\D/g, "");

        if (valueDate.length > 2) {
            valueDate = valueDate.replace(/^(\d{2})(\d)/, "$1/$2");
        }
        if (valueDate.length > 5) {
            valueDate = valueDate.replace(/^(\d{2})\/(\d{2})(\d)/, "$1/$2/$3");
        }

        //setDate(valueDate);
    }

    function changeTimeFormat(time: ChangeEvent<HTMLInputElement>) {
        // Remove caracteres não numéricos
        let valueTime = time.target.value.replace(/\D/g, "");

        if (valueTime.length > 2) {
            valueTime = valueTime.replace(/^(\d{2})(\d)/, "$1:$2");
        }

        //setTime(valueTime);
    }

    async function createActivity(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const data = new FormData(event.currentTarget);

        const title = data.get("title")?.toString();
        const occurs_at = data.get("occurs_at")?.toString();
        // const date = data.get("date")?.toString();
        // const time = data.get("time")?.toString();

        // const occurs_at = joinDateAndTime(date!, time!);

        console.log({ title, occurs_at });


        await api.post(`trips/${tripId}/activities`, { title, occurs_at })
            .then(response => {
                console.log(response.data);
                document.location.reload();
            })
            .catch(error => console.log(error));


    }

    function joinDateAndTime(date: string, time: string) {
        const toBreakDate = date.split("/");
        const toBreakTime = time.split(":");

        return new Date(toBreakDate[2], toBreakDate[1] - 1, toBreakDate[0], toBreakTime[0], toBreakTime[1], 0, 0).toISOString().slice(0, 16);
    }

    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">

            <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">

                <div className="space-y-2">

                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-semibold">Cadastrar atividade</h2>

                        <button
                            type="button"
                            onClick={closeCreateActivityModal}
                        >
                            <X className="size-5 text-zinc-400" />
                        </button>

                    </div>

                    <p className="text-sm text-zinc-400">
                        Todos convidados podem visualizar as atividades.
                    </p>
                </div>

                <form onSubmit={createActivity} className="space-y-3">
                    <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
                        <Tag className="text-zinc-400 size-5" />
                        <input
                            type="text"
                            name="title"
                            className="bg-transparent placeholder-zinc-400 outline-none w-full"
                            placeholder="Qual a atividade?"
                        />
                    </div>

                    <div className="flex items-center gap-2">

                        <div className="flex-1 h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
                            <Calendar className="text-zinc-400 size-5" />
                            <input
                                type="datetime-local"
                                name="occurs_at"
                                className="bg-transparent placeholder-zinc-100 outline-none w-full"
                                placeholder="Data e horário da atividade"
                            />
                        </div>
                        {/* <div className="flex-1 h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
                            <Calendar className="text-zinc-400 size-5" />
                            <input
                                type="text"
                                name="date"
                                onChange={changeToDateFormat}
                                maxLength={10}
                                value={date}
                                className="bg-transparent placeholder-zinc-100 outline-none w-full"
                                placeholder="Data e horário da atividade"
                            />
                        </div>
                         */}
                        {/* <div className="h-14 w-36 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
                            <Clock className="text-zinc-400 size-5" />
                            <input
                                type="text"
                                name="time"
                                onChange={changeTimeFormat}
                                maxLength={5}
                                value={time}
                                className="bg-transparent placeholder-zinc-400 outline-none w-full"
                                placeholder="Horário"
                            />
                        </div> */}

                    </div>

                    <Button type="submit" size="full">Salvar atividade</Button>
                </form>
            </div>

        </div>
    );
}