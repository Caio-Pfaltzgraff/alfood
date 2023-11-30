import { Box, Button, Container, Paper, TextField, Typography } from "@mui/material"
import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import http from "../../../http";

const FormularioRestaurante = () => {

    const parametros = useParams()

    useEffect(() => {
        if(parametros.id) {
            http.get(`restaurantes/${parametros.id}/`)
                .then(response => setNomeRestaurante(response.data.nome))
        }
        setNomeRestaurante('')
    }, [parametros])

    const [nomeRestaurante, setNomeRestaurante] = useState('')

    const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault();

        if (parametros.id) {
            http.put(`restaurantes/${parametros.id}/`, {
                nome: nomeRestaurante
            })
                .then(() => {
                    alert("Restaurante atualizado com sucesso")
                })
        } else {
            http.post('restaurantes/', {
                nome: nomeRestaurante
            })
                .then(() => {
                    alert("Restaurante cadastrado com sucesso")
                })
        }

    } 

    return(
        <>
            <Box>
                <Container maxWidth='lg' sx={{ mt: 1 }}>
                    <Paper sx={{ p: 2 }}>
                        <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', flexGrow: 1}}>
                            <Typography variant="h6" component='h1'>Formulário de Restaurantes</Typography>
                            <Box component='form' sx={{ width: '100%' }} onSubmit={aoSubmeterForm}>
                                <TextField 
                                    value={nomeRestaurante} 
                                    onChange={e => setNomeRestaurante(e.target.value)} 
                                    label="Nome do Restaurante" 
                                    variant="standard" 
                                    fullWidth
                                    required
                                />
                                <Button sx={{marginTop: 1}} type="submit" fullWidth variant="outlined">Salvar</Button>
                            </Box>
                        </Box>
                    </Paper>
                </Container>
            </Box>
        </>
    )
} 

export default FormularioRestaurante