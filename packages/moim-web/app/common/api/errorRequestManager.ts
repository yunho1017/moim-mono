import { Method } from "axios";

interface IRequest {
  url: string;
  method: Method;
  count: number;
}

class ErrorRequestManager {
  private requests: IRequest[] = [];

  public add(url: string, method: Method) {
    const request = this.find(url, method);

    if (request) {
      request.count++;
    } else {
      this.requests.push({
        url,
        method,
        count: 1,
      });
    }
  }

  public remove(url: string, method: Method): void {
    this.requests = this.requests.filter(
      request => request.url !== url && request.method !== method,
    );
  }

  public getErrorCount(url: string, method: Method): number {
    const request = this.find(url, method);
    return request?.count ?? 0;
  }

  private find(url: string, method: Method): IRequest | undefined {
    return this.requests.find(
      request => request.url === url && request.method === method,
    );
  }
}

export default ErrorRequestManager;
