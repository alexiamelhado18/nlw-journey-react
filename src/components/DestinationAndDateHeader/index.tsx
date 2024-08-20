//icones
import { Calendar, MapPin, Settings2 } from "lucide-react";

//components
import { Button } from "../Button";

//hooks
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

//axios
import { api } from "../../utils/api";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface Trip {
    destination: string
    ends_at: string
    id: string
    is_confirmed: boolean
    starts_at: string
};

export function DestinationAndDateHeader() {
    const { tripId } = useParams();

    const [trip, setTrip] = useState<Trip | undefined>();

    const displayedDate = trip
        ? format(trip?.starts_at, "d ' de ' LLL", { locale: ptBR }).concat(" até ").concat(format(trip?.ends_at, "d ' de ' LLL", { locale: ptBR }))
        : null;

    useEffect(() => {

        api.get(`trips/${tripId}`)
            .then(response => setTrip(response.data.trip))
            .catch(error => console.log(error));

    }, [tripId]);

    return (
        <header className="px-4 h-16 rounded-xl bg-zinc-900 shadow-shape flex items-center justify-between">
            <div className="flex items-center gap-2">
                <MapPin className="size-5 text-zinc-400" />
                <span className="text-zinc-100">{trip?.destination}</span>
            </div>


            <div className="flex items-center gap-5">
                <div className="flex items-center gap-2">
                    <Calendar className="size-5 text-zinc-400" />
                    <span className="text-zinc-100">{displayedDate}</span>
                </div>

                <div className="w-px h-6 bg-zinc-800" />

                <Button variant="secondary">
                    Alterar local/data
                    <Settings2 className="size-5" />
                </Button>
            </div>
        </header>
    );
}