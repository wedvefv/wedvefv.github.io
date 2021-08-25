+++
title="coc如何补全vim的"
categories=["vim"] 
tags=["vim"] 
date="2020-08-29 21:00:00+0800"
toc=true
+++

- coc插件原理 vscode 补全利用的是LSP (language server protocol), 简单理解就是编辑时启动一个进程，补全果过程就类似app请求服务器得到补全数据。这就是为什么要装node，服务进程都是node启动。

### 第一步 安装nvim
-  首先你需要 安装vim8 或者nvim 我测试的是macos 
-  如果是nvim， 需要把nvim 的配置文件做一次软链接指向 ~/.vimrc 这是延续以前的vim配置方式, 不做的话，只能修改init.vim , nvim的配置默认读取这个文件。
-  以下下提到的都是nvim，我在/etc/profile alias vim="nvim" 了
```
ln -s ~/.config/nvim/init.vim ~/.vimrc

```
### 第二步 安装nvim插件管理器 Vim-plug
```json
curl -fLo ~/.config/nvim/autoload/plug.vim --create-dirs https://raw.githubusercontent.com/junegunn/vim-plug/master/plug.vim
```
- 打不开这个域名，可以直接去github搜索plug.vim ,手动复制下来.

### 第四步 如何安装php补全插件

 - [各种语言coc扩展这里有](https://github.com/neoclide/coc.nvim/wiki/Using-coc-extensions)
- coc-phpactor 是php7以上才可以用
- coc-phpls 一般都用这个

- 第一步 需要安装Intelephense
	```
	npm i intelephense -g
	```
- 第二步打开vim, 安装coc-phpls
  ```
  CocInstall coc-phpls
  ```
- 第三步 配置php [language server](https://github.com/neoclide/coc.nvim/wiki/Language-servers#php)
    -  vim : CocConfig 
    -  会默认打开一个配置文件
      ```
	    {    
          "languageserver": {    
			 "intelephense": {    
				"command": "intelephense",    
				"args": ["--stdio"],    
				"filetypes": ["php"],    
				"initializationOptions": {    
					"storagePath": "/Users/kunming/php/"    
				}    
			}
		}
	  ```
	- 这里外面的intelephense表示配置的名称
	- command里面的intelephense是一个文件
	- args 表示可执行文件后面的参数
	-  比如你打开一个php文件，ps命令可以看到系统会启动一个进程 `node /usr/local/bin/intelephense --stdio`
	-  有一个索引js的进程`/usr/local/bin/node --no-warnings /Users/kunming/.SpaceVim/plugged/coc.nvim/build/index.js`
	-  node还会启动一个进程类似这样`/usr/local/Cellar/node/14.1.0/bin/node /Users/kunming/.config/coc/extensions/node_modules/coc-phpls/node_modules/intelephense/lib/intelephense.js --node-ipc --clientProcessId=72264`
    - filetypes 指定了对php文件有效
	- storagePath 表示初始化信息存储的位置，据我观察应该是打开一个文件，进程为php建立补全信息建立的索引日志文件，安装intelephense，会附带好多php文件，常见的php库，也是为了建立索引用的，初次编辑一个php文件，这个目录会有28872930这样的文件夹。 
	- mac上貌似只有你在storagePath目录下建立的php文件或者项目，**vim编辑才会出现补全提示**，在别的目录是没有提示的，这一点研究了好久才感觉出来，文档也没说这些
	- centos7下面貌似没这些问题， 都可以提示出来，可以不配置CocConfig。

#### 其余插件，我只安装了go的coc扩展和coc的python扩展，go需要fatih/vim-go来支持
- 同样每次编辑他们的文件都会启动一个类似node进程`/usr/local/bin/node --no-warnings /Users/kunming/.SpaceVim/plugged/coc.nvim/build/index.js`
- 都是一个套路：
-  1.找到所需的插件，比如coc-python  安装他需要的依赖，一般插件后面会提到
-  2. vim中安装coc扩展 CocInstall coc-python
-  3. vim来打配置CocConfig，添加对应语言的server配置
-  4. 所以LSP是一个cs结构的，有服务端也就是node进程， 客户端就是vim编辑器


```vim
set nu
set ts=4
set shiftwidth=4
set expandtab
set autoindent


" 插件列表
call plug#begin('~/.config/nvim/plugged')

" 功能相关
Plug 'neoclide/coc.nvim', {'branch': 'release'}
Plug 'fatih/vim-go', { 'do': ':GoUpdateBinaries' }

call plug#end()

let s:script_cwd = expand('<sfile>:p:h')


let g:go_def_mode='gopls'
let g:go_info_mode='gopls'


" tab 补全

" TextEdit might fail if hidden is not set.
"set hidden

" Some servers have issues with backup files, see #649.
"set nobackup
"set nowritebackup

" Give more space for displaying messages.
set cmdheight=2

" Having longer updatetime (default is 4000 ms = 4 s) leads to noticeable
" delays and poor user experience.
set updatetime=100

" Don't pass messages to |ins-completion-menu|.
"set shortmess+=c

" Always show the signcolumn, otherwise it would shift the text each time
" diagnostics appear/become resolved.
if has("patch-8.1.1564")
  " Recently vim can merge signcolumn and number column into one
  set signcolumn=number
else
  set signcolumn=yes
endif

" Use tab for trigger completion with characters ahead and navigate.
" NOTE: Use command ':verbose imap <tab>' to make sure tab is not mapped by
" other plugin before putting this into your config.
inoremap <silent><expr> <TAB>
      \ pumvisible() ? "\<C-n>" :
      \ <SID>check_back_space() ? "\<TAB>" :
      \ coc#refresh()
inoremap <expr><S-TAB> pumvisible() ? "\<C-p>" : "\<C-h>"

function! s:check_back_space() abort
  let col = col('.') - 1
  return !col || getline('.')[col - 1]  =~# '\s'
endfunction

" Use <c-space> to trigger completion.
if has('nvim')
  inoremap <silent><expr> <c-space> coc#refresh()
else
  inoremap <silent><expr> <c-@> coc#refresh()
endif

" Use <cr> to confirm completion, `<C-g>u` means break undo chain at current
" position. Coc only does snippet and additional edit on confirm.
" <cr> could be remapped by other vim plugin, try `:verbose imap <CR>`.
if exists('*complete_info')
  inoremap <expr> <cr> complete_info()["selected"] != "-1" ? "\<C-y>" : "\<C-g>u\<CR>"
else
  inoremap <expr> <cr> pumvisible() ? "\<C-y>" : "\<C-g>u\<CR>"
endif

" Use `[g` and `]g` to navigate diagnostics
" Use `:CocDiagnostics` to get all diagnostics of current buffer in location list.
nmap <silent> [g <Plug>(coc-diagnostic-prev)
nmap <silent> ]g <Plug>(coc-diagnostic-next)

" GoTo code navigation.
nmap <silent> gd <Plug>(coc-definition)
nmap <silent> gy <Plug>(coc-type-definition)
nmap <silent> gi <Plug>(coc-implementation)
nmap <silent> gr <Plug>(coc-references)

" Use K to show documentation in preview window.
nnoremap <silent> K :call <SID>show_documentation()<CR>

function! s:show_documentation()
  if (index(['vim','help'], &filetype) >= 0)
    execute 'h '.expand('<cword>')
  else
    call CocAction('doHover')
  endif
endfunction

" Highlight the symbol and its references when holding the cursor.
autocmd CursorHold * silent call CocActionAsync('highlight')

" Symbol renaming.
nmap <leader>rn <Plug>(coc-rename)

" Formatting selected code.
xmap <leader>f  <Plug>(coc-format-selected)
nmap <leader>f  <Plug>(coc-format-selected)

augroup mygroup
  autocmd!
  " Setup formatexpr specified filetype(s).
  autocmd FileType typescript,json setl formatexpr=CocAction('formatSelected')
  " Update signature help on jump placeholder.
  autocmd User CocJumpPlaceholder call CocActionAsync('showSignatureHelp')
augroup end

" Applying codeAction to the selected region.
" Example: `<leader>aap` for current paragraph
xmap <leader>a  <Plug>(coc-codeaction-selected)
nmap <leader>a  <Plug>(coc-codeaction-selected)

" Remap keys for applying codeAction to the current buffer.
nmap <leader>ac  <Plug>(coc-codeaction)
" Apply AutoFix to problem on the current line.
"nmap <leader>qf  <Plug>(coc-fix-current)

" Map function and class text objects
" NOTE: Requires 'textDocument.documentSymbol' support from the language server.
xmap if <Plug>(coc-funcobj-i)
omap if <Plug>(coc-funcobj-i)
xmap af <Plug>(coc-funcobj-a)
omap af <Plug>(coc-funcobj-a)
xmap ic <Plug>(coc-classobj-i)
omap ic <Plug>(coc-classobj-i)
xmap ac <Plug>(coc-classobj-a)
omap ac <Plug>(coc-classobj-a)

" Use CTRL-S for selections ranges.
" Requires 'textDocument/selectionRange' support of LS, ex: coc-tsserver
nmap <silent> <C-s> <Plug>(coc-range-select)
xmap <silent> <C-s> <Plug>(coc-range-select)

" Add `:Format` command to format current buffer.
command! -nargs=0 Format :call CocAction('format')

" Add `:Fold` command to fold current buffer.
command! -nargs=? Fold :call     CocAction('fold', <f-args>)

" Add `:OR` command for organize imports of the current buffer.
command! -nargs=0 OR   :call     CocAction('runCommand', 'editor.action.organizeImport')

" Add (Neo)Vim's native statusline support.
" NOTE: Please see `:h coc-status` for integrations with external plugins that
" provide custom statusline: lightline.vim, vim-airline.
set statusline^=%{coc#status()}%{get(b:,'coc_current_function','')}

" Mappings for CoCList
" Show all diagnostics.
nnoremap <silent><nowait> <space>a  :<C-u>CocList diagnostics<cr>
" Manage extensions.
nnoremap <silent><nowait> <space>e  :<C-u>CocList extensions<cr>
" Show commands.
nnoremap <silent><nowait> <space>c  :<C-u>CocList commands<cr>
" Find symbol of current document.
nnoremap <silent><nowait> <space>o  :<C-u>CocList outline<cr>
" Search workspace symbols.
nnoremap <silent><nowait> <space>s  :<C-u>CocList -I symbols<cr>
" Do default action for next item.
nnoremap <silent><nowait> <space>j  :<C-u>CocNext<CR>
" Do default action for previous item.
nnoremap <silent><nowait> <space>k  :<C-u>CocPrev<CR>
" Resume latest coc list.
nnoremap <silent><nowait> <space>p  :<C-u>CocListResume<CR>
```
