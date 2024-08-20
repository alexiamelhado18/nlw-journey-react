import { Link2, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../Button";

export function ImportantLinks() {
    return (
        <div className="space-y-6">
            <h2 className="font-semibold text-xl">Links importantes</h2>

            <div className="space-y-5">
                <div className="flex items-center justify-between gap-4">
                    <div className="space-y-1.5 flex flex-col max-w-60">
                        <span className="font-medium text-zinc-100 ">Reserva do AirBnB</span>
                        <Link className="truncate text-zinc-400 text-xs hover:text-zinc-200" to={"#"} target="_blank">
                            https://www.airbnb.com.br/rooms/104700011
                        </Link>
                    </div>
                    <Link2 className="size-5 text-zinc-400 shrink-0" />
                </div>

                <div className="flex items-center justify-between gap-4">
                    <div className="space-y-1.5 flex flex-col max-w-60">
                        <span className="font-medium text-zinc-100 ">Reserva do AirBnB</span>
                        <Link className="truncate text-zinc-400 text-xs hover:text-zinc-200" to={"#"} target="_blank">
                            https://www.airbnb.com.br/rooms/104700011
                        </Link>
                    </div>
                    <Link2 className="size-5 text-zinc-400 shrink-0" />
                </div>
            </div>

            <Button
                type="button"
                variant="secondary"
                size="full"
            >
                <Plus className="size-5" />
                Cadastrar novo link
            </Button>
        </div>
    );
}