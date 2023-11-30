import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material"
import { useState, useEffect } from 'react';
import http from "../../../http";
import ITag from "../../../interfaces/ITag";
import IRestaurante from "../../../interfaces/IRestaurante";

const FormularioPrato = () => {
    const [nomePrato, setNomePrato] = useState('')
    const [descricao, setDescricao] = useState('')
    const [tag, setTag] = useState('')
    const [restaurante, setRestaurante] = useState('')

    const [imagem, setImagem] = useState<File | null>(null)

    const [tags, setTags] = useState<ITag[]>([])
    const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([])

    useEffect(() => {
        http.get<{ tags: ITag[] }>('tags/')
            .then(response => setTags(response.data.tags))
        http.get<IRestaurante[]>('restaurantes/')
            .then(response => setRestaurantes(response.data))
    }, [])

    const selecionarArquivo = (evento: React.ChangeEvent<HTMLInputElement>) => {
        if(evento.target.files?.length) {
            setImagem(evento.target.files[0])
        } else {
            setImagem(null)
        }
    }

    const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault();

    } 

    return(
        <>
            <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', flexGrow: 1}}>
                <Typography variant="h6" component='h1'>Formulário de Pratos</Typography>
                <Box component='form' sx={{ width: '100%' }} onSubmit={aoSubmeterForm}>
                    <TextField 
                        value={nomePrato} 
                        onChange={e => setNomePrato(e.target.value)} 
                        label="Nome do Prato" 
                        variant="standard" 
                        fullWidth
                        required
                        margin="dense"
                    />
                    <TextField 
                        value={descricao} 
                        onChange={e => setDescricao(e.target.value)} 
                        label="Descrição do Prato" 
                        variant="standard" 
                        fullWidth
                        required
                        margin="dense"
                    />

                    <FormControl margin="dense" fullWidth >
                        <InputLabel id="select-tag">Tag</InputLabel>
                        <Select labelId="select-tag" value={tag} onChange={e => setTag(e.target.value)}>
                            {tags.map(tag => <MenuItem value={tag.id} key={tag.id}>
                                {tag.value}
                            </MenuItem>)}
                        </Select>
                    </FormControl>

                    <FormControl margin="dense" fullWidth >
                        <InputLabel id="select-restaurante">Restaurante</InputLabel>
                        <Select labelId="select-restaurante" value={restaurante} onChange={e => setRestaurante(e.target.value)}>
                            {restaurantes.map(restaurante => <MenuItem value={restaurante.id} key={restaurante.id}>
                                {restaurante.nome}
                            </MenuItem>)}
                        </Select>
                    </FormControl>

                    <input type="file" onChange={selecionarArquivo}/>

                    <Button sx={{marginTop: 1}} type="submit" fullWidth variant="outlined">Salvar</Button>
                </Box>
            </Box>
        </>
    )
} 

export default FormularioPrato