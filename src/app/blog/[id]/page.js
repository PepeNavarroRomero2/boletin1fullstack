'use client'
import { useEffect, useState } from "react";
import { use } from "react";

export default function Item({ params }) {
    const { id } = use(params);
    const [item, setItem] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [titulo, setTitulo] = useState("");
    const [contenido, setContenido] = useState("");
    const [autor, setAutor] = useState("");
    const [fechaPublicacion, setFechaPublicacion] = useState("");

    async function actualizarItem(e) {
        e.preventDefault();
        const response = await fetch("/api/blog", {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: id,
                update: {
                    titulo: titulo,
                    contenido: contenido,
                    autor: autor,
                    fechaPublicacion: fechaPublicacion
                }
            })
        });
        setIsEditing(false);
        fetchItems();
    }

    async function fetchItems() {
        const url = "/api/blog/blogUser?id=" + id;
        const response = await fetch(url);
        const cont = await response.json();
        setTitulo(cont.titulo);
        setContenido(cont.contenido);
        setAutor(cont.autor);
        setFechaPublicacion(cont.fechaPublicacion);
        setItem(cont);
    }

    useEffect(() => {
        fetchItems();
    }, []);

    if (item && !isEditing) {
        return (
            <div>
                <h1>{item.titulo}</h1>
                <p>{item.contenido}</p>
                <p>{item.autor}</p>
                <p>{item.fechaPublicacion}</p>
                <button onClick={() => setIsEditing(true)}>Editar</button>
            </div>
        );
    } else if (item && isEditing) {
        return (
            <form onSubmit={actualizarItem}>
                <label>
                    Título:
                    <input
                        type="text"
                        value={titulo}
                        onChange={(e) => setTitulo(e.target.value)}
                        required
                    />
                </label>
                <br />
                <label>
                    Contenido:
                    <textarea
                        value={contenido}
                        onChange={(e) => setContenido(e.target.value)}
                        required
                    />
                </label>
                <br />
                <label>
                    Autor:
                    <input
                        type="text"
                        value={autor}
                        onChange={(e) => setAutor(e.target.value)}
                        required
                    />
                </label>
                <br />
                <label>
                    Fecha de publicación:
                    <input
                        type="date"
                        value={fechaPublicacion}
                        onChange={(e) => setFechaPublicacion(e.target.value)}
                    />
                </label>
                <br />
                <input type="submit" value="Actualizar" />
            </form>
        );
    } else {
        return (<p>No encontrado</p>);
    }
}