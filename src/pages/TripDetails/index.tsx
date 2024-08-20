import { Plus, } from "lucide-react";
import { useState } from "react";
import { CreateActivityModal } from "../../components/CreateActivityModal";
import { ImportantLinks } from "../../components/ImportantLinks";
import { Guests } from "../../components/Guests";
import { Activities } from "../../components/Activities";
import { DestinationAndDateHeader } from "../../components/DestinationAndDateHeader";
import { Button } from "../../components/Button";

export function TripDetails() {

    const [isCreateActivityModalOpen, setIsCreateActivityModalOpen] = useState(false);

    function openCreateActivityModal() {
        setIsCreateActivityModalOpen(true)
    }

    function closeCreateActivityModal() {
        setIsCreateActivityModalOpen(false)
    }


    return (
        <>
            <div className="max-w-6xl px-6 py-10 mx-auto space-y-8">
                <DestinationAndDateHeader />

                <main className="flex gap-16 px-5">
                    <div className="flex-1 space-y-6">
                        <div className="flex justify-between items-center">
                            <h2 className="text-3xl font-semibold">Atividades</h2>

                            <Button type="button" onClick={openCreateActivityModal}>
                                <Plus className="size-5 text-lime-950" />
                                Cadastrar atividade
                            </Button>
                        </div>

                        <Activities />
                    </div>

                    <div className="w-80 space-y-6">
                        <ImportantLinks />

                        <div className="w-full h-px bg-zinc-800" />

                        <Guests />
                    </div>
                </main>
            </div>

            {isCreateActivityModalOpen && (
                <CreateActivityModal
                    closeCreateActivityModal={closeCreateActivityModal}
                />
            )}
        </>
    );
};