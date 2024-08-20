import {
    ArrowRight,
    Calendar,
    MapPin,
    Settings2,
    X
} from "lucide-react";
import { Button } from "../Button";
import { useState } from "react";
import { DateRange, DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import { ptBR } from "date-fns/locale";
import { format } from "date-fns";

interface DestinationAndDateStepProps {
    isGuestsInputOpen: boolean,
    closeGuestsInput: () => void,
    openGuestsInput: () => void,
    setDestination: (destination: string) => void,
    eventStartAndEndDates: DateRange | undefined,
    setEventStartAndEndDates: (dates: DateRange | undefined) => void
}

export function DestinationAndDateStep({
    isGuestsInputOpen,
    closeGuestsInput,
    openGuestsInput,
    setDestination,
    eventStartAndEndDates,
    setEventStartAndEndDates
}: DestinationAndDateStepProps) {

    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

    function openDatePicker() {
        setIsDatePickerOpen(true);
    }
    function closeDatePicker() {
        setIsDatePickerOpen(false);
    }

    const displayedDate = eventStartAndEndDates && eventStartAndEndDates.from && eventStartAndEndDates.to
        ? format(eventStartAndEndDates.from, "d ' de ' LLL").concat(' até ').concat(format(eventStartAndEndDates.to, "d ' de ' LLL"))
        : null;

    return (
        <>
            <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape gap-2">

                <div className="flex items-center gap-2 flex-1">

                    <MapPin className="size-5 text-zinc-400" />

                    <input
                        type="text"
                        placeholder="Para onde você vai?"
                        className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
                        disabled={isGuestsInputOpen}
                        onChange={event => setDestination(event.target.value)}
                    />

                </div>

                <button
                    type="button"
                    onClick={openDatePicker}
                    disabled={isGuestsInputOpen}
                    className="flex items-center gap-2 text-left w-[280px]"
                >
                    <Calendar className="size-5 text-zinc-400" />

                    <span className="bg-transparent text-lgtext-zinc-400 w-40 outline-none flex-1"
                    >
                        {displayedDate || "Quando?"}
                    </span>

                </button>

                <div className="w-px h-6 bg-zinc-800" />

                {isGuestsInputOpen ? (
                    <Button
                        type="button"
                        onClick={closeGuestsInput}
                        variant="secondary"
                    >
                        Alterar local/data
                        <Settings2 className="size-5" />
                    </Button>



                ) : (
                    <Button
                        type="button"
                        onClick={openGuestsInput}
                    >
                        Continuar
                        <ArrowRight className="size-5 text-lime-950" />
                    </Button>
                )}


            </div>
            {
                isDatePickerOpen && (
                    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">

                        <div className="rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">

                            <div className="space-y-2">

                                <div className="flex items-center justify-between">
                                    <h2 className="text-lg font-semibold">Selecione a data</h2>

                                    <button
                                        type="button"
                                        onClick={closeDatePicker}
                                    >
                                        <X className="size-5 text-zinc-400" />
                                    </button>
                                </div>

                            </div>
                            <DayPicker
                                mode="range"
                                selected={eventStartAndEndDates}
                                onSelect={setEventStartAndEndDates}
                                locale={ptBR}
                            />
                        </div>

                    </div>
                )
            }

        </>

    );
}