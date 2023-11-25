/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-else-return */
/* eslint-disable eqeqeq */
/* eslint-disable no-redeclare */
/* eslint-disable no-empty */
/* eslint-disable block-scoped-var */
/* eslint-disable no-throw-literal */
/* eslint-disable func-names */
/* eslint-disable no-new-object */
/* eslint-disable vars-on-top */
/* eslint-disable no-var */
export default function Cockpit() {
  if (navigator.userAgent.indexOf("MSIE") > -1) {
    // IE
    var win =
      window.opener == null
        ? window.top.windowOpener != null
          ? window.top.windowOpener
          : window
        : window.opener;

    if (typeof window != "undefined" && typeof window.external != "undefined") {
      win = window;
    }
    if (
      typeof window != "undefined" &&
      typeof window.opener != "undefined" &&
      typeof window.opener.external != "undefined"
    ) {
      win = window.opener;
    }
    if (
      typeof window != "undefined" &&
      typeof window.top != "undefined" &&
      typeof window.top.external != "undefined"
    ) {
      win = window.top;
    }
    if (
      typeof window != "undefined" &&
      typeof window.top != "undefined" &&
      typeof window.top.windowOpener != "undefined" &&
      typeof window.top.windowOpener.external != "undefined"
    ) {
      win = window.top.windowOpener;
    }

    var ext = win.external;
    var version = typeof ext.Versao == "undefined" ? ext.Version : ext.Versao;

    // validar se est� a correr no cockpit
    if (typeof version == "undefined") {
      throw "Cockpit n�o encontrado.";
    }

    var scriptVersion =
      typeof ext.Versao == "undefined" ? ext.Version : ext.ScriptVersion;

    this.Master = ext.Master;
    this.Local = ext.Local;
    this.Session = ext.Session;
    this.Diagnostics = ext.Diagnostics;

    this.get_Version = function () {
      return version;
    };
    this.get_Local = function (k) {
      return this.Local.Get(k);
    };
    this.set_Local = function (k, v) {
      this.Local.Set(k, v);
    };
    this.ClearLocal = function () {
      this.Local.Clear();
    };

    if (scriptVersion > "1.2.") {
      this.get_Command = function () {
        return this.Local.ID;
      };
      this.get_Title = function () {
        return this.Local.Title;
      };
      this.set_Title = function (t) {
        this.Local.Title = t;
      };
      this.get_Descr = function () {
        return this.Local.Description;
      };
      this.set_Descr = function (d) {
        this.Local.Description = d;
      };
      this.Ctx = function (T, V) {
        return this.Session.Get(T, V);
      };
      this.OpenDoc = function (i, t, d, u) {
        return this.Session.OpenDoc(i, t, d, u);
      };
      this.IsInRole = function (p, a) {
        return this.Session.IsInRole(p, a);
      };
      this.CanExecCmd = function (c) {
        return this.Session.Commands.CanExecute(c);
      };
      this.CanExecSlvCmd = function (c) {
        return this.Session.Commands.CanExecuteAsSlave(c);
      };
      this.Terminate = function (s) {
        ext.Terminate(s);
      };
      this.ExecSlvCmd = function (c, p, f) {
        var pry = { fn: f };
        this.Session.Commands.ExecuteAsSlave(c, p, pry, "fn");
      };
      this.CreateStopwatch = function (i, d, as) {
        return this.Diagnostics.CreateStopwatch(i, d, as);
      };
      this.GetStopwatch = function (i) {
        return this.Diagnostics.GetStopwatch(i);
      };
      this.Trace = function (t) {
        this.Diagnostics.Trace(t);
      };
      this.Debug = function (d) {
        this.Diagnostics.Debug(d);
      };

      // Exclusivo PainelServicoWebCmd
      this.ExecCmd = function (c, p) {
        this.Session.Commands.Execute(c, p);
      };

      // Exclusivo PainelServicoWebCmdOpr
      this.ExecOpr = function (o, p) {
        return this.Session.Operations.Execute(o, p);
      };
      this.ExecOprCmd = function (o, p, c) {
        var op = this.Session.Operations.Create(o, p);
        if (c != null) {
          var cp = c.split("?");
          if (cp.length > 0) {
            op.AddCommand(cp[0], cp.length > 1 ? cp[1] : null);
          }
        }
        return op.Execute();
      };
    } else {
      this.get_Command = function () {
        return ext.Chave;
      };
      this.get_Title = function () {
        return ext.Nome;
      };
      this.set_Title = function (t) {
        ext.Nome = t;
      };
      this.get_Descr = function () {
        return ext.Descricao;
      };
      this.set_Descr = function (d) {
        ext.Descricao = d;
      };
      this.Ctx = function (T, V) {
        return ext.Contexto(T, V);
      };
      this.CanExecCmd = function (c) {
        return ext.VerificaPermissoes(c);
      };
      this.Terminate = function (s) {
        ext.Termina(s);
      };
      this.ExecSlvCmd = function (c, p, f) {
        var pry = { fn: f };
        this.ExecSlvCmdEx(c, p, pry, "fn");
      };

      // Exclusivo PainelServicoWebCmd
      if (scriptVersion >= "1.1.2") {
        this.ExecCmd = function (c, p, s) {
          ext.ExecutaComando(c, p);
        };
      } else {
        this.ExecCmd = function (c, p, s) {
          ext.ExecutaComando(c, p, false);
        };
      }

      // Exclusivo PainelServicoWebCmdOpr
      this.ExecOpr = function (o, p) {
        ext.ExecutaOperacao(o, p);
        return true;
      };
      this.ExecOprCmd = function (o, p, c) {
        ext.ExecutaOperacaoComando(o, p, c);
        return true;
      };
    }

    // Obsolete
    this.Ver = version;
    this.Chave = function () {
      return this.get_Command();
    };
    this.Nome = function (n) {
      if (typeof n == "undefined") {
        return this.get_Title();
      } else {
        this.set_Title(n);
        return n;
      }
    };
    this.Descr = function (d) {
      if (typeof d == "undefined") {
        return this.get_Descr();
      } else {
        this.set_Descr(d);
        return d;
      }
    };
    // ~Obsolete

    // Para ler dados do contexto
    this.read = function (c, p) {
      var valor = new Object();
      valor = this.Session.Get(c, p);
      return valor;
    };
  } else {
    // Other
    // validar se est� a correr no cockpit
    var ckp = false;

    try {
      if (
        window.chrome != null &&
        window.chrome.webview != null &&
        window.chrome.webview.hostObjects != null &&
        window.chrome.webview.hostObjects.sync != null &&
        window.chrome.webview.hostObjects.sync.Cockpit != null
      ) {
        var ext = window.chrome.webview.hostObjects.sync.Cockpit;
        ckp = true;
      }
    } catch (e) {}

    try {
      if (
        window.parent.chrome != null &&
        window.parent.chrome.webview != null &&
        window.parent.chrome.webview.hostObjects != null &&
        window.parent.chrome.webview.hostObjects.sync != null &&
        window.parent.chrome.webview.hostObjects.sync.Cockpit != null
      ) {
        var ext = window.parent.chrome.webview.hostObjects.sync.Cockpit;
        ckp = true;
      }
    } catch (e) {}

    if (ckp == false) {
      throw "Cockpit n�o encontrado.";
    }

    this.Master = ext.Master;
    this.Local = ext.Local;
    this.Session = ext.Session;
    this.Diagnostics = ext.Diagnostics;

    this.get_Version = function () {
      return ext.Version;
    };
    this.get_Local = function (k) {
      return this.Local.Get(k);
    };
    this.set_Local = function (k, v) {
      this.Local.Set(k, v);
    };
    this.ClearLocal = function () {
      this.Local.Clear();
    };

    this.get_Command = function () {
      return this.Local.ID;
    };
    this.get_Title = function () {
      return this.Local.Title;
    };
    this.set_Title = function (t) {
      this.Local.Title = t;
    };
    this.get_Descr = function () {
      return this.Local.Description;
    };
    this.set_Descr = function (d) {
      this.Local.Description = d;
    };
    this.Ctx = function (T, V) {
      return this.Session.Get(T, V);
    };
    this.OpenDoc = function (i, t, d, u) {
      return this.Session.OpenDoc(i, t, d, u);
    };
    this.IsInRole = function (p, a) {
      return this.Session.IsInRole(p, a);
    };
    this.CanExecCmd = function (c) {
      return this.Session.Commands.CanExecute(c);
    };
    this.CanExecSlvCmd = function (c) {
      return this.Session.Commands.CanExecuteAsSlave(c);
    };
    this.Terminate = function (s) {
      ext.Terminate(s);
    };
    this.ExecSlvCmd = function (c, p, f) {
      var pry = { fn: f };
      this.Session.Commands.ExecuteAsSlave(c, p, pry, "fn");
    };
    this.CreateStopwatch = function (i, d, as) {
      return this.Diagnostics.CreateStopwatch(i, d, as);
    };
    this.GetStopwatch = function (i) {
      return this.Diagnostics.GetStopwatch(i);
    };
    this.Trace = function (t) {
      this.Diagnostics.Trace(t);
    };
    this.Debug = function (d) {
      this.Diagnostics.Debug(d);
    };

    // Exclusivo PainelServicoWebCmd
    this.ExecCmd = function (c, p) {
      this.Session.Commands.Execute(c, p);
    };

    // Exclusivo PainelServicoWebCmdOpr
    this.ExecOpr = function (o, p) {
      return this.Session.Operations.Execute(o, p);
    };
    this.ExecOprCmd = function (o, p, c) {
      var op = this.Session.Operations.Create(o, p);
      if (c != null) {
        var cp = c.split("?");
        if (cp.length > 0) {
          op.AddCommand(cp[0], cp.length > 1 ? cp[1] : null);
        }
      }
      return op.Execute();
    };

    this.get_DadosContexto = function () {
      var dados = new Object();
      dados.NomeOperador = this.Session.Get("OPER", "uchLiNOpe");
      dados.Operador = this.Session.Get("OPER", "uchIdAgt");
      dados.Estrutura = this.Session.Get("BALC", "uchIdES");
      dados.NomeEstrutura = this.Session.Get("BALC", "uchLnd1ES");
      dados.IDPN = this.Session.Get("_cli", "efIdpn");
      dados.Conta = this.Session.Get("_cli", "idrbes");
      dados.IdSessaoNPT = this.Session.Get("PiMC", "SCLI");
      dados.CodigoBanco = this.Session.Get("ENTIDADE", "CodigoBanco");
      dados.Entidade = this.Session.Get("ENTIDADE", "Codigo");
      dados.Abreviado = this.Session.Get("ENTIDADE", "Abreviado");
      dados.Nome = this.Session.Get("_cli", "efnome");
      dados.Nif = this.Session.Get("_cli", "efnif");
      return dados;
    };

    // Para ler dados do contexto
    this.read = function (c, p) {
      var valor = new Object();
      valor = this.Session.Get(c, p);
      return valor;
    };
  }
}
