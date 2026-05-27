import { Component, OnInit } from '@angular/core';
import { ProfissionalService } from '../services/profissional';
import { AgendamentoService } from '../services/agendamento.service';

@Component({
  selector: 'app-home-profissional',
  standalone: false,
  templateUrl: './home-profissional.html',
  styleUrl: './home-profissional.css',
})
export class HomeProfissional implements OnInit {
  diasAtivos: any[] = [];
  fotoPerfil: string = '';
  agendamentos: any[] = [];

  modalAberto = false;
  agendamentoSelecionado: any = null;
  novoHorario: string = '';
  slotsDisponiveis: string[] = [];

  constructor(
    private profissionalService: ProfissionalService,
    private agendamentoService: AgendamentoService,
  ) {}

  ngOnInit() {
    this.carregarDados();
  }

  carregarDados() {
    const agenda = this.profissionalService.getAgenda();
    this.diasAtivos = agenda.filter((d: any) => !d.fechado);
    const perfil = localStorage.getItem('fotoPerfil');
    this.fotoPerfil = perfil ? perfil : '';
    this.agendamentos = this.agendamentoService.getAgendamentos();
  }

  gerarSlots(dia: any): string[] {
    const index = this.profissionalService.getAgenda().findIndex((d: any) => d.nome === dia.nome);
    return this.profissionalService.gerarSlots(index, 30);
  }

  getAgendamentoDoSlot(dia: string, horario: string): any {
    return this.agendamentos.find(a => a.dia === dia && a.horario === horario) || null;
  }

  abrirModal(ag: any) {
    this.agendamentoSelecionado = ag;
    this.novoHorario = ag.horario;
    const diaObj = this.diasAtivos.find(d => d.nome === ag.dia);
    this.slotsDisponiveis = diaObj ? this.gerarSlots(diaObj) : [];
    this.modalAberto = true;
  }

  fecharModal() {
    this.modalAberto = false;
    this.agendamentoSelecionado = null;
  }

  salvarEdicao() {
    this.agendamentoService.editarAgendamento(this.agendamentoSelecionado.id, this.novoHorario);
    this.carregarDados();
    this.fecharModal();
  }

  excluir() {
    this.agendamentoService.excluirAgendamento(this.agendamentoSelecionado.id);
    this.carregarDados();
    this.fecharModal();
  }
}