import { MulticontasDTO } from 'src/core/domain/dtos/multicontas/multicontas.dto';

export const mockedMulticontas: MulticontasDTO[] = [
  {
    codigoUsuario: 0,
    codigoAgencia: 0,
    numeroConta: 0,
    usuarioPessoa: 'any_usuario_pessoa',
    nomePessoa: 'any_nome_pessoa',
  },
];

export const mockedHeadersMulticontas: any = {
  cooperativa: '99999',
  authorization: 'any_token',
};

export const mockedMulticontasConfig: any = {
  params: {
    cpfCnpj: 'any_documento',
    canal: 'INTERNET_BANKING',
  },
  headers: mockedHeadersMulticontas,
};
