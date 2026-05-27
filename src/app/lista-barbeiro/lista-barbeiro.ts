import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BarbeiroService } from '../services/barbeiro.service';

@Component({
  selector: 'app-lista-barbeiro',
  standalone: false,
  templateUrl: './lista-barbeiro.html',
  styleUrl: './lista-barbeiro.css',
})
export class ListaBarbeiro implements OnInit {
  barbeiros: any[] = [];
  servicoFiltro: string = '';

  constructor(
    private barbeiroService: BarbeiroService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.servicoFiltro = this.route.snapshot.paramMap.get('servico') || '';
    const todos = this.barbeiroService.getBarbeiros();

    this.barbeiros = this.servicoFiltro
      ? todos.filter((b: any) => b.servicos?.includes(this.servicoFiltro))
      : todos;
  }
}