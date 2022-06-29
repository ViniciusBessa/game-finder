import { RoundNumberPipe } from './round-number.pipe';

describe('RoundNumberPipe', () => {
  it('create an instance', () => {
    const pipe = new RoundNumberPipe();
    expect(pipe).toBeTruthy();
  });

  it('the number 0.9 rounded should return 1', () => {
    const pipe = new RoundNumberPipe();
    expect(pipe.transform(0.9)).toEqual(1);
  });

  it("the number 12.49 rounded shouldn't return 13", () => {
    const pipe = new RoundNumberPipe();
    expect(pipe.transform(12.49)).not.toEqual(13);
  });
});
