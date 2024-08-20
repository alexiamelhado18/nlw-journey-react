import { CircleCheck } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../utils/api";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface Activity {
    date: string,
    activities:
    {
        id: string,
        title: string,
        occurs_at: string
    }[]
};

export function Activities() {
    const { tripId } = useParams();

    const [activities, setActivities] = useState<Activity[]>([]);

    useEffect(() => {
        api.get(`trips/${tripId}/activities`)
            .then(response => setActivities(response.data.activities))
            .catch(error => console.log(error));

    }, [tripId])
    return (
        <section className="space-y-8">

            {activities.map(day => {
                return <div key={day.date} className="space-y-2.5">
                    <div className="flex gap-2 items-baseline">
                        <span className="text-xl text-zinc-300 font-semibold">Dia {format(day.date, "d'/'LLL", { locale: ptBR })}</span>
                        <p className="text-xs text-zinc-500">{format(day.date, "EEE", { locale: ptBR })}</p>
                    </div>
                    {day.activities.length > 0 ? (
                        day.activities.map(activity => {
                            return <div key={activity.id} className="space-y-2.5">
                                <div className="px-4 py-2.5 bg-zinc-900 rounded-xl shadow-shape flex items-center gap-3">
                                    <CircleCheck className="size-5 text-lime-300" />
                                    <p className="text-zinc-100">{activity.title}</p>
                                    <p className="text-zinc-400 text-sm ml-auto">{format(activity.occurs_at, "HH:mm")}h</p>
                                </div>
                            </div>
                        })
                    ) : (
                        <p className="text-zinc-500 text-sm">Nenhuma atividade cadastrada nessa data.</p>
                    )}
                </div>
            })}


            {/* 
            <div className="space-y-2.5">
                <div className="flex gap-2 items-baseline">
                    <span className="text-xl text-zinc-300 font-semibold">Dia 18</span>
                    <p className="text-xs text-zinc-500">Domingo</p>
                </div>

                <div className="space-y-2.5">
                    <div className="px-4 py-2.5 bg-zinc-900 rounded-xl shadow-shape flex items-center gap-3">
                        <CircleCheck className="size-5 text-lime-300" />
                        <p className="text-zinc-100">Academia em grupo</p>
                        <p className="text-zinc-400 text-sm ml-auto">08:00h</p>
                    </div>
                </div>

                <div className="space-y-2.5">
                    <div className="px-4 py-2.5 bg-zinc-900 rounded-xl shadow-shape flex items-center gap-3">
                        <CircleCheck className="size-5 text-lime-300" />
                        <p className="text-zinc-100">Academia em grupo</p>
                        <p className="text-zinc-400 text-sm ml-auto">08:00h</p>
                    </div>
                </div>
            </div> */}
        </section >
    );
}