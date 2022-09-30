import { Test, TestingModule } from '@nestjs/testing';
import { ApiLoggerService } from './logger.service';
describe('ApiLoggerService', () => {
  let sut: ApiLoggerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ApiLoggerService],
    }).compile();

    sut = module.get<ApiLoggerService>(ApiLoggerService);
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
  });

  it('should return void if call log function', () => {
    expect(sut.log('ANY_MESSAGE')).toBe(void 0);
  });

  it('should call logger with a correct message', () => {
    const message = 'ANY_MESSAGE';
    const logSpy = jest.spyOn(sut, 'log');
    sut.log(message);
    expect(logSpy).toHaveBeenCalledWith(message);
  });

  it('should return void if call warning function', () => {
    expect(sut.warn('ANY_MESSAGE')).toBe(void 0);
  });

  it('should call warning with a correct message', () => {
    const message = 'ANY_MESSAGE';
    const logSpy = jest.spyOn(sut, 'warn');
    sut.warn(message);
    expect(logSpy).toHaveBeenCalledWith(message);
  });

  it('should return void if call error function', () => {
    expect(sut.error('ANY_MESSAGE')).toBe(void 0);
  });

  it('should call error with a correct message', () => {
    const message = 'ANY_MESSAGE';
    const logSpy = jest.spyOn(sut, 'error');
    sut.error(message);
    expect(logSpy).toHaveBeenCalledWith(message);
  });

  it('should call error with a correct message and stack', () => {
    const message = 'ANY_MESSAGE';
    const stack = 'ANY_STACK';
    const logSpy = jest.spyOn(sut, 'error');
    sut.error(message, stack);
    expect(logSpy).toHaveBeenCalledWith(message, stack);
  });

  it('should call error with a correct message, stack and context', () => {
    const message = 'ANY_MESSAGE';
    const stack = 'ANY_STACK';
    const context = 'ANY_CONTEXT';
    const logSpy = jest.spyOn(sut, 'error');
    sut.error(message, stack, context);
    expect(logSpy).toHaveBeenCalledWith(message, stack, context);
  });

  it('should return void if call verbose function', () => {
    expect(sut.verbose('ANY_MESSAGE')).toBe(void 0);
  });

  it('should call verbose with a correct message', () => {
    const message = 'ANY_MESSAGE';
    const logSpy = jest.spyOn(sut, 'verbose');
    sut.verbose(message);
    expect(logSpy).toHaveBeenCalledWith(message);
  });

  it('should return void if call debug function', () => {
    expect(sut.debug('ANY_MESSAGE')).toBe(void 0);
  });

  it('should call debug with a correct message', () => {
    const message = 'ANY_MESSAGE';
    const logSpy = jest.spyOn(sut, 'debug');
    sut.debug(message);
    expect(logSpy).toHaveBeenCalledWith(message);
  });
});
