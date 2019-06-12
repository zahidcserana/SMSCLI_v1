import { BoltTerminalModule } from './bolt-terminal.module';

describe('BoltTerminalModule', () => {
  let boltTerminalModule: BoltTerminalModule;

  beforeEach(() => {
    boltTerminalModule = new BoltTerminalModule();
  });

  it('should create an instance', () => {
    expect(boltTerminalModule).toBeTruthy();
  });
});
