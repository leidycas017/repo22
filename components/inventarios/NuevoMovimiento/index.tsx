import React, { useEffect } from "react";
import {
  PrimaryActionButton,
  SecondaryActionButton,
} from "@/components/ui/Dialog/Buttons";
import { Dialog } from "@/components/ui/Dialog";
import { RequiredMark } from "@/components/ui/Dialog/Forms/RequiredMark";
import { useGetRoles } from "@/hooks/useGetRoles";
import { API_SERVICES } from "@/services";
import { Dispatch, SetStateAction, useState, SyntheticEvent } from "react";
import { toast } from "react-toastify";
import { mutate } from "swr";
import axios, { AxiosError } from "axios";
import { MovimientoFilters } from "@/components/MovimientoFilters";

interface NuevoMovimientoProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const NuevoMovimiento = ({ open, setOpen }: NuevoMovimientoProps) => {
  const [loading, setLoading] = useState(false);
  const { roles } = useGetRoles();
  const [formData, setFormData] = useState({
    id: "",
    fecha: "",
    movimiento: "",
    entrada: "",
    salida: "",
    responsable: "",
  });

  const [movimientoResult, setMovimientoResult] = useState("");
  useEffect(() => {
    // const result = <MovimientoFilters />;
    // setMovimientoResult(result);
  }, []);

  const submitForm = async (e: SyntheticEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Nuevo Movimiento
      await axios.request({
        method: "POST",
        url: API_SERVICES.material,
        data: {
          ...formData,
        },
      });
      // Actualizar
      await mutate(API_SERVICES.material);
      toast.success("Movimiento registrado exitosamente");
      setOpen(false);
    } catch (error) {
      const errorResponse = error as AxiosError;

      const errorData = errorResponse?.response?.data as { message: string };
    }

    setLoading(false);
  };
  return (
    <Dialog title="Material 1" open={open} onClose={() => setOpen(false)}>
      <form className="flex flex-col gap-3" onSubmit={submitForm}>
        <label htmlFor="identificador">
          <span>
            Identificador <RequiredMark />
          </span>
          <input
            name="identificador"
            type="text"
            placeholder="Identificador"
            required
            value={formData.id}
            onChange={(e) => setFormData({ ...formData, id: e.target.value })}
          />
        </label>
        <label htmlFor="fecha">
          <span>
            Fecha <RequiredMark />
          </span>
          <input
            name="fecha"
            type="text"
            placeholder="Fecha"
            required
            value={formData.fecha}
            onChange={(e) =>
              setFormData({ ...formData, fecha: e.target.value })
            }
          />
        </label>
        <span>
          Movimiento <RequiredMark />
        </span>
        <MovimientoFilters />
        {movimientoResult !== "Salida" && (
          // Renderizar la #Primera si el resultado es 'Entrada'
          <label htmlFor="entrada">
            <span></span>
            <input
              name="entrada"
              type="text"
              placeholder="Ingrese Cantidad"
              required
              value={formData.entrada}
              onChange={(e) =>
                setFormData({ ...formData, entrada: e.target.value })
              }
            />
          </label>
        )}
        {movimientoResult === "Salida" && (
          // Renderizar la #Segunda si el resultado no es 'Entrada'
          <label htmlFor="salida">
            <span></span>
            <input
              name="salida"
              type="text"
              placeholder="Cantidad"
              required
              value={formData.salida}
              onChange={(e) =>
                setFormData({ ...formData, salida: e.target.value })
              }
            />
          </label>
        )}
        <label htmlFor="responsable">
          <span>
            Responsable
            <RequiredMark />
          </span>
          <input
            name="responsable"
            type="text"
            placeholder="Responsable"
            required
            value={formData.responsable}
            onChange={(e) =>
              setFormData({ ...formData, responsable: e.target.value })
            }
          />
        </label>

        <div className="flex gap-3">
          <PrimaryActionButton
            text="Agregar Movimiento"
            loading={loading}
            type="submit"
            onClick={() => {}}
          />
          <SecondaryActionButton
            text="Cancelar"
            onClick={() => setOpen(false)}
            loading={loading}
            type="button"
          />
        </div>
      </form>
    </Dialog>
  );
};

export { NuevoMovimiento };
