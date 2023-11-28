import { useEffect, useState } from 'react';
import style from './ListaRestaurantes.module.scss';
import Restaurante from './Restaurante';
import axios from 'axios';
import IRestaurante from '../../interfaces/IRestaurante';
import { IPaginacao } from '../../interfaces/IPaginacao';

const ListaRestaurantes = () => {
  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([])
  const [proximaPagina, setProximaPagina] = useState('')
  const [paginaAnterior, setPaginaAnterior] = useState('')

  const carregarDados = (url: string) => {
    axios.get<IPaginacao<IRestaurante>>(url)
      .then(response => {
        setRestaurantes(response.data.results)
        setProximaPagina(response.data.next)
        setPaginaAnterior(response.data.previous)
      })
      .catch(error => {
        console.log(error)
      })
  }

  useEffect(() => {
    //obter restaurantes
    carregarDados('http://localhost:8000/api/v1/restaurantes/')
  }, [])

  return (
    <section className={style.ListaRestaurantes}>
      <h1>Os restaurantes mais <em>bacanas</em>!</h1>
      {restaurantes?.map(item => <Restaurante restaurante={item} key={item.id} />)}
      {<button onClick={() => carregarDados(paginaAnterior)} disabled={!paginaAnterior}>
        Página Anterior
      </button>}
      {<button onClick={() => carregarDados(proximaPagina)} disabled={!proximaPagina}>
        Próxima página
      </button>}
    </section>
  )
}

export default ListaRestaurantes