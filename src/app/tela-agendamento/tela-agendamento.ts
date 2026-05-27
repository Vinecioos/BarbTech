import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { BarbeiroService } from '../services/barbeiro.service';

@Component({
  selector: 'app-tela-agendamento',
  standalone: false,
  templateUrl: './tela-agendamento.html',
  styleUrl: './tela-agendamento.css',
})
export class TelaAgendamento implements OnInit {
  fotoBanner: any;
  fotoPerfil: any;
  abaSelecionada: string = 'servicos';
  servicoSelecionado: any = null;
  barbeiro: any = null;

  constructor(
    private sanitizer: DomSanitizer,
    private route: ActivatedRoute,
    private barbeiroService: BarbeiroService
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.barbeiro = this.barbeiroService.getBarbeiros().find((b: any) => b.id === id);

    const perfil = localStorage.getItem('fotoPerfil');
    const banner = localStorage.getItem('fotoBanner');

    this.fotoPerfil = this.sanitizer.bypassSecurityTrustStyle(
      perfil ? `url(${perfil})` : "url('/avatar-padrao.png')"
    );
    this.fotoBanner = this.sanitizer.bypassSecurityTrustStyle(
      banner ? `url(${banner})` : "url('/capa-padrao.jpg')"
    );
  }

  selecionarAba(aba: string) {
    this.abaSelecionada = aba;
  }

  onServicoEscolhido(servico: any) {
    this.servicoSelecionado = servico;
    this.abaSelecionada = 'agenda';
  }
}