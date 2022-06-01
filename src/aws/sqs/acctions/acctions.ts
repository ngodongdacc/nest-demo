export class Acction {
  constructor() {}
  public async run(params: { acction: string; body: object }) {
    switch (params.acction) {
      case 'upload_file':
        break;

      default:
        break;
    }
  }
}
