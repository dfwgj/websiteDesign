import { Inject, Middleware, httpError, Config, InjectClient } from '@midwayjs/core';
import { Context, NextFunction } from '@midwayjs/koa';
import { JwtService } from '@midwayjs/jwt';
import { CachingFactory, MidwayCache } from '@midwayjs/cache-manager';
@Middleware()
export class JwtMiddleware {
  @Inject()
  jwtService: JwtService;
  @InjectClient(CachingFactory, 'redis')
  cache: MidwayCache; //redis缓存
  @Config('jwtConfig') // 动态注入配置
  jwtConfig: { secret: string; expiresIn: string | number };
  resolve() {
    return async (ctx: Context, next: NextFunction) => {
      // 判断是否有 Authorization header
      const authorization = ctx.headers['authorization'];
      if (!authorization) {
        throw new httpError.UnauthorizedError('缺少 Authorization 头');
      }
      const parts = authorization.trim().split(' ');
      if (parts.length !== 2) {
        throw new httpError.UnauthorizedError('Token 格式无效');
      }
      const [scheme, token] = parts;
      if (/^Bearer$/i.test(scheme)) {
        try {
          const decoded = await this.jwtService.verify(
            token,
            this.jwtConfig.secret,
            { complete: true }
          );
          // 如果 token 有效，继续请求
          if (typeof decoded === 'string') {
            throw new httpError.UnauthorizedError('无效的 token');
          }
          ctx.state.user = decoded.payload; // 将用户信息保存在 ctx.state 中
          try {
            const userId = ctx.state.user.userId;
            const userIdCache = await this.cache.get(`userId:${userId}`);
            if (!userIdCache) {
              throw new Error('Token 无效');
            }
          } catch (error) {
            console.log(error);
            throw new httpError.UnauthorizedError('Token 无效');
          }
          await next();
        } catch (error) {
          if (error.message === 'ForbiddenError') {
            throw new httpError.ForbiddenError(
              'You do not have the necessary permissions'
            );
          }
          if (error.name === 'JsonWebTokenError') {
            throw new httpError.UnauthorizedError('无效或过期的 Token');
          }
          if (error.name === 'TokenExpiredError') {
            throw new httpError.UnauthorizedError('Token 已过期');
          } else {
            throw error;
          }
        }
      } else {
        throw new httpError.UnauthorizedError('Token 无效');
      }
    };
  }
  // 配置忽略鉴权的路由地址
  public match(ctx: Context): boolean {
    const ignoreRoutes = [
      '/api/auth/login',
      '/api/auth/register',
      '/api/contest/getContest',
      '/api/course/getCourse',
      '/api/materials/getMaterials',
    ];
    const ignore = ignoreRoutes.some(route => ctx.path.indexOf(route) !== -1);
    return !ignore;
  }
  public static getName(): string {
    return 'jwt';
  }
}
