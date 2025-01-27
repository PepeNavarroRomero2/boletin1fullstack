'use client'
import { useState, useEffect } from "react"
import Link from "next/link"

export default function ListItems() {
    const [items, setItems] = useState([])

    async function fetchItems() {
        const response = await fetch("api/blog")
        const body = await response.json()
        setItems(body)
    }

    useEffect(() => {
        fetchItems()
    }, []);

    async function deleteItem(deleteID) {
        if (window.confirm("¿Seguro que quieres eliminarlo permanentemente?")) {
            const response = await fetch("/api/blog", {
                method: 'DELETE',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: deleteID })
            });
            if (response.ok) {
                fetchItems();
            } else {
                console.error("Error al eliminar el item");
            }
        }
    }

    return (
        <div>
            <h1>ItemList</h1>
            {items.map(item => 
                <div key={item.id}>
                    <Link href={"/blog/" + item.id}>
                        <p>Titulo: {item.titulo}</p>
                        <p>Autor: {item.autor}</p>    
                        <p>Fecha Publicacion: {item.fecha_publicacion}</p>
                    </Link>
                    <button onClick={() => deleteItem(item.id)}>Eliminar</button>
                </div>
            )}
        </div>
    )
}