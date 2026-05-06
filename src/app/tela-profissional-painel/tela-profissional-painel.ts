import { ChangeDetectorRef, Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-tela-profissional-painel',
  standalone: false,
  templateUrl: './tela-profissional-painel.html',
  styleUrl: './tela-profissional-painel.css',
})
export class TelaProfissionalPainel {

  
  fotoPerfil: any;
  fotoBanner: any;

 
  domiciliarAtivo = false;
  endereco = { rua: '', numero: '', bairro: '', cep: '' };
  
  agenda = [
    { nome: 'Segunda', inicio: '09:00', fim: '18:00', fechado: false },
    { nome: 'Terça', inicio: '09:00', fim: '18:00', fechado: false },
    { nome: 'Quarta', inicio: '09:00', fim: '18:00', fechado: false },
    { nome: 'Quinta', inicio: '09:00', fim: '18:00', fechado: false },
    { nome: 'Sexta', inicio: '09:00', fim: '18:00', fechado: false },
    { nome: 'Sábado', inicio: '09:00', fim: '18:00', fechado: true },
    { nome: 'Domingo', inicio: '09:00', fim: '18:00', fechado: true },
  ];

  dias = [
    { nome: 'SEG', ativo: false }, { nome: 'TER', ativo: false },
    { nome: 'QUA', ativo: false }, { nome: 'QUI', ativo: false },
    { nome: 'SEX', ativo: false }, { nome: 'SÁB', ativo: false },
    { nome: 'DOM', ativo: false },
  ];

  listaServicos = [
    { nome: 'Corte Social', valor: '45,00', tempo: 30 },
    { nome: 'Barba Completa', valor: '35,00', tempo: 20 },
    { nome: 'Corte + Barba', valor: '75,00', tempo: 50 },
    { nome: 'Degradê / Fade', valor: '50,00', tempo: 40 }
  ];

  constructor(
    private sanitizer: DomSanitizer,
    private cdr: ChangeDetectorRef 
  ) {
   
    this.fotoPerfil = this.sanitizer.bypassSecurityTrustStyle("url('/avatar-padrao.png')");
    this.fotoBanner = this.sanitizer.bypassSecurityTrustStyle("url('/capa-padrao.jpg')");
  }

  // --- Lógica da Foto de Perfil ---
 onFileSelected(event: any) {
  const file = event.target.files[0];

  if (file) {
    const reader = new FileReader();

    reader.onload = (e: any) => {
      const base64 = e.target.result;
      this.fotoPerfil = this.sanitizer.bypassSecurityTrustStyle(`url(${base64})`);
      this.cdr.detectChanges();
    };

    reader.readAsDataURL(file);
  }

 
  event.target.value = '';
}
  
onBannerSelected(event: any) {
  const file = event.target.files[0];

  if (file) {
    const reader = new FileReader();

    reader.onload = (e: any) => {
      const base64 = e.target.result;
      this.fotoBanner = this.sanitizer.bypassSecurityTrustStyle(`url(${base64})`);
      this.cdr.detectChanges();
    };

    reader.readAsDataURL(file);
  }


  event.target.value = '';
}


  toggleFechado(dia: any) {
    dia.fechado = !dia.fechado;
  }

  toggleDia(dia: any) {
    if (!this.domiciliarAtivo) return;
    dia.ativo = !dia.ativo;
  }

  getDiasSelecionados() {
    return this.dias.filter(d => d.ativo).map(d => d.nome);
  }
}