import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://wjcwjhszfnocrkvwumnh.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndqY3dqaHN6Zm5vY3Jrdnd1bW5oIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzczODgxNTksImV4cCI6MjA1Mjk2NDE1OX0.Ob2eeJk5wlO8tUjmkvx9N6aB1cIPcsuKiJoMa2Jwuk8"
const supabase = createClient(supabaseUrl, supabaseKey)

export async function GET() {
    const{data: item, error} = await supabase
    .from('articulos')
    .select('*')

    return new Response(JSON.stringify(item), {status:200})
}

export async function PUT(request){
    const body = await request.json()
    const id = body.id
    const {data: updateData, error} = await supabase.from("articulos").update(body.update).eq("id",id)
    return new Response(JSON.stringify({success: "actualizado"},{status:200}))
}

export async function DELETE(request){
    const body = await request.json()
    const id = body.id
    
    const {data: deleteData, error} = await supabase.from("articulos").delete().eq("id", id)
    
    if(error){
        return new Response(JSON.stringify(error), {status:404})
    }
    
    return new Response(JSON.stringify({success: "eliminado con éxito"}), {status:200})
}