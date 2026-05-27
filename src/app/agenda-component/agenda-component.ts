import { Component, Input, OnInit } from '@angular/core';
import { ProfissionalService } from '../services/profissional';
import { AgendamentoService } from '../services/agendamento.service';

@Component({
  selector: 'app-agenda-component',
  standalone: false,
  templateUrl: './agenda-component.html',
  styleUrl: './agenda-component.css'
})
export class AgendaComponent implements OnInit {
  confirmado: boolean = false;

  @Input() servico: any = null;

  agenda: any[] = [];
  diaSelecionado: any = null;
  slots: string[] = [];
  horarioSelecionado: string | null = null;

  nomeCliente: string = '';

  constructor(
    private profissionalService: ProfissionalService,
    private agendamentoService: AgendamentoService
  ) {}

  ngOnInit() {
    this.agenda = this.profissionalService.getAgenda();
  }

  selecionarDia(dia: any, index: number) {
    if (dia.fechado) return;
    this.diaSelecionado = dia;
    this.horarioSelecionado = null;
    const duracao = this.servico?.tempo ?? 30;
    this.slots = this.profissionalService.gerarSlots(index, duracao);
  }

  selecionarHorario(slot: string) {
    this.horarioSelecionado = slot;
  }

  confirmar() {
    if (!this.diaSelecionado || !this.horarioSelecionado) return;

    this.agendamentoService.salvarAgendamento({
      dia: this.diaSelecionado.nome,
      horario: this.horarioSelecionado,
      servico: this.servico?.nome ?? 'Não informado',
      cliente: this.nomeCliente || 'Cliente',
      duracaoMin: this.servico?.tempo ?? 30,
    });

    this.confirmado = true;
  }

  novoAgendamento() {
    this.confirmado = false;
    this.horarioSelecionado = null;
    this.diaSelecionado = null;
    this.slots = [];
    this.nomeCliente = '';
  }
}