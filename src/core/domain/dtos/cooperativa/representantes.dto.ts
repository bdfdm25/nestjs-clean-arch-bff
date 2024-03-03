export class RepresentantesDTO {
  codigoCooperativa: number;
  codigoPessoa: number;
  codigoPosto: number;
  cpf: string;
  dataFimVigencia: string;
  dataInicioVigencia: string;
  descricaoCargoGovernanca: string;
  estadoCivil: string;
  nomePessoa: string;
  tipoPessoa: string;
}

export type SituacaoRepresentante = 'ATIVO' | 'INATIVO';
export type TipoRepresentante = 'DIRETOR';
export enum EnumTipoRepresentante {
  'DIRETOR',
}
export enum EnumSituacaoRepresentante {
  'ATIVO',
  'INATIVO',
}
