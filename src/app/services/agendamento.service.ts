import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AgendamentoService {
  private readonly CHAVE = 'agendamentos';

  getAgendamentos() {
    const salvo = localStorage.getItem(this.CHAVE);
    return salvo ? JSON.parse(salvo) : [];
  }

  salvarAgendamento(agendamento: any) {
    const lista = this.getAgendamentos();
    lista.push({ ...agendamento, id: Date.now() });
    localStorage.setItem(this.CHAVE, JSON.stringify(lista));
  }

  editarAgendamento(id: number, novoHorario: string) {
    const lista = this.getAgendamentos().map((a: any) =>
      a.id === id ? { ...a, horario: novoHorario } : a
    );
    localStorage.setItem(this.CHAVE, JSON.stringify(lista));
  }

  excluirAgendamento(id: number) {
    const lista = this.getAgendamentos().filter((a: any) => a.id !== id);
    localStorage.setItem(this.CHAVE, JSON.stringify(lista));
  }
}