//icones
import { CircleCheck, CircleDashed, UserCog } from "lucide-react";

//componentes
import { Button } from "../Button";

//hooks
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

//axios
import { api } from "../../utils/api";


interface Participant {
    id: string
    name: string | null
    email: string
    is_confirmed: boolean
};

export function Guests() {

    const { tripId } = useParams();

    const [participants, setParticipants] = useState<Participant[]>([]);

    useEffect(() => {
        api.get(`trips/${tripId}/participants`)
            .then(response => setParticipants(response.data.participants))
            .catch(error => console.log(error));

    }, [tripId])

    return (
        <div className="space-y-6">
            <h2 className="font-semibold text-xl">Convidados</h2>

            <div className="space-y-5">
                {participants.map((participant, index) => {
                    return <div key={participant.id} className="flex items-center justify-between gap-4">
                        <div className="space-y-1.5 flex flex-col max-w-60">
                            <span className="font-medium text-zinc-100 ">{participant.name ?? `Convidado ${index}`}</span>
                            <p className="truncate text-zinc-400 text-sm">
                                {participant.email}
                            </p>
                        </div>
                        {participant.is_confirmed ? (<CircleCheck className="size-5 text-lime-300 shrink-0" />
                        ) : (
                            <CircleDashed className="size-5 text-zinc-400 shrink-0" />
                        )}

                    </div>
                })}

            </div>

            <Button
                type="button"
                variant="secondary"
                size="full"
            >
                <UserCog className="size-5" />
                Gerenciar convidados
            </Button>
        </div>
    );
}