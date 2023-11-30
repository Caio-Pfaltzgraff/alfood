import { useEffect, useState } from 'react';
import style from './ListaRestaurantes.module.scss';
import Restaurante from './Restaurante';
import axios, { AxiosRequestConfig } from 'axios';
import IRestaurante from '../../interfaces/IRestaurante';
import { IPaginacao } from '../../interfaces/IPaginacao';

// esses são os posséveis parâmetros que podemos enviar para a API
interface IParametrosBusca {
  ordering?: string
  search?: string
}

const ListaRestaurantes = () => {
  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([])
  const [proximaPagina, setProximaPagina] = useState('')
  const [paginaAnterior, setPaginaAnterior] = useState('')

  const [busca, setBusca] = useState('')
  const [ordenacao, setOrdenacao] = useState('')

  const carregarDados = (url: string, opcoes: AxiosRequestConfig = {}) => {
    axios.get<IPaginacao<IRestaurante>>(url, opcoes)
      .then(response => {
        setRestaurantes(response.data.results)
        setProximaPagina(response.data.next)
        setPaginaAnterior(response.data.previous)
      })
      .catch(error => {
        console.log(error)
      })
  }

  // a cada busca, montamos um objeto de opções
  const buscar = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault()
    const opcoes = {
      params: {

      } as IParametrosBusca
    }
    if (busca) {
      opcoes.params.search = busca
    }
    if (ordenacao) {
      opcoes.params.ordering = ordenacao
    }
    carregarDados('http://localhost:8000/api/v1/restaurantes/', opcoes)
    setBusca('')
  }

  useEffect(() => {
    //obter restaurantes
    carregarDados('http://localhost:8000/api/v1/restaurantes/')
  }, [])

  return (
    <section className={style.ListaRestaurantes}>
      <h1>Os restaurantes mais <em>bacanas</em>!</h1>
      <form onSubmit={buscar} className={style.formulario}>
        <div className={style.formulario__buscador}>
          <input 
          type="text" 
          value={busca} 
          id='buscador'
          onChange={evento => setBusca(evento.target.value)}
          placeholder='Buscar restaurante' 
          />
        </div>
        <div className={style.formulario__ordenador}>
          <label htmlFor="select-ordenacao">Ordenação</label>
          <select
            name="select-ordenacao"
            id="select-ordenacao"
            value={ordenacao}
            onChange={evento => setOrdenacao(evento.target.value)}
          >
            <option value="">Padrão</option>
            <option value="id">Por ID</option>
            <option value="nome">Por Nome</option>
          </select>
        </div>
        <div className={style.formulario__botao}>
          <button type='submit'>Buscar</button>
        </div>
    </form>
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