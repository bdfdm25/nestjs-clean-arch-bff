import { RepresentantesDTO } from '@dtos/cooperativa/representantes.dto';

export const mockedRepresentantes: RepresentantesDTO[] = [
  {
    codigoCooperativa: 0,
    codigoPessoa: 0,
    codigoPosto: 0,
    cpf: 'any_cpf',
    dataFimVigencia: 'any_data_fim_vigencia',
    dataInicioVigencia: 'any_data_inicio_vigencia',
    descricaoCargoGovernanca: 'any_descricao_cargo_governanca',
    estadoCivil: 'any_estado_civil',
    nomePessoa: 'any_nome_pessoa',
    tipoPessoa: 'any_tipo_pessoa',
  },
];

export const mockedRepresentantesConfig: any = {
  params: {
    stRepr: 'ATIVO',
    tpRepr: 'DIRETOR',
  },
};
