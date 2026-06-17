@AGENTS.md

## Preview local (rede)

O `next.config.ts` tem `allowedDevOrigins` com os IPs de rede permitidos. Se o IP da máquina mudar (troca de rede, reinício do roteador), o acesso via `http://<ip>:3001/` carrega o HTML normalmente mas o React nunca hidrata: nenhum evento, nenhuma animação GSAP, nada de JS roda, e não aparece erro nenhum no console. O log do dev server mostra um aviso de "Blocked cross-origin request" para o IP não permitido.

Se as animações ou interações pararem de funcionar no preview de rede, primeiro confira o IP atual (`ifconfig | grep "inet "`) e adicione em `allowedDevOrigins`, depois reinicie o dev server.
