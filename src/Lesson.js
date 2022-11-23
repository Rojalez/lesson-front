import React, {useEffect, useState} from "react";
import Editor from "react-simple-code-editor";
import {highlight, languages} from "prismjs/components/prism-core";
import parse from "html-react-parser";
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism-solarizedlight.min.css';
import {useLocalStorage} from "./hooks/useLocalStorage";
import Button from "./components/UI/Button";
import Pagination from "./components/Pagination";
import ToggleTheme from "./ToggleTheme";


const Lesson = ({lesson, lessons, currentPage, setCurrentPage}) => {
    const [style, setStyle] = useLocalStorage("Стили для " + lesson.title, "");
    const [head, setHead] = useState(``);
    const [foot] = useState(`</body>
</html>`);
    const [isShown, setIsShown] = useState(false);
    const [body, setBody] = useLocalStorage(lesson.title, lesson.html);
    const toggleEditor = () => { setIsShown(current => !current)};
    useEffect(() => {
        setHead(`<!doctype html>
<html lang="ru">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
<meta http-equiv="X-UA-Compatible" content="ie=edge">
<title>${lesson.title}</title>
${lesson.style ? `<style>
${lesson.css ? lesson.css : style}
</style>` : ``}
</head>
<body>`)
    }, [style, lesson.style, lesson.title, body, lesson.css]);

    const clearBody = () => {
        setBody('');
    };

    const clearStyle = () => {
        setStyle('');
    };


    return (
            <div className={'flex w-full flex-col space-y-4'}>
                    <div className={'cursor-default w-full'}>
                        <div className="h-12 rounded-t-2xl transition-colors duration-1000 dark:bg-gray-900 bg-gray-800 flex justify-start items-center space-x-1.5 px-4">
                         <div className="font-mono font-bold text-gray-50 flex justify-between w-full items-center">
                             <span>{lesson.title}</span>
                             <ToggleTheme/>
                         </div>
                        </div>
                        <div className={'p-4 bg-white transition-colors duration-1000 dark:bg-gray-800 dark:text-white text-black min-h-[100px] rounded-b-2xl font-mono md:text-sm text-xs'}>
                            {parse(lesson.description)}
                        </div>
                    </div>
                <div className={'flex md:flex-row flex-col md:space-x-4 space-x-0 md:space-y-0 space-y-4'}>
                    <div className={'md:w-1/2 w-full'}>
                        <div className="h-12 rounded-t-2xl transition-colors duration-1000 dark:bg-gray-900 bg-gray-800 flex justify-between items-center space-x-1.5 px-4">
                         <span className="font-mono font-bold cursor-default text-gray-50">
                             Редактор кода
                         </span>
                            <div className={'space-x-2'}>
                                {!isShown
                                    ? body !== ''
                                        ? <Button color={'gray-100'} textColor={'black'} cursor={'pointer'} disabled={!body} onClick={clearBody}>Очистить</Button>
                                        : <Button color={'gray-300'} textColor={'gray-100'} cursor={'not-allowed'} disabled={!body}>Очистить</Button>
                                    : style !== ''
                                        ? lesson.css ? null : <Button color={'gray-100'} textColor={'black'} cursor={'pointer'} disabled={!style} onClick={clearStyle}>Очистить стили</Button>
                                        : <Button color={'gray-300'} textColor={'gray-100'} cursor={'not-allowed'} disabled={!style}>Очистить стили</Button>
                                }
                                {lesson.style === 1
                                    ? <Button color={'white'} cursor={'pointer'} textColor={'black'} onClick={toggleEditor}>
                                        {isShown ? 'HTML' : 'CSS'}
                                    </Button>
                                    : null
                                }
                            </div>
                        </div>
                        <div className={'dark:bg-gray-800 transition-colors duration-1000 bg-white rounded-b-2xl px-2'}>
                            {isShown && (
                                    <Editor
                                        className={'md:text-base text-sm transition-colors duration-1000 dark:text-white rounded font-mono min-h-[384px]'}
                                        value={lesson.css ? lesson.css : style}
                                        placeholder='Вводите сюда...'
                                        onValueChange={style => setStyle(style)}
                                        highlight={style => highlight(style, languages.js)}
                                        padding={10}
                                        disabled={lesson.css ? 'disabled' : false}
                                    />
                            )}
                            {!isShown && (
                                <div>
                                    <Editor
                                        className={'md:text-sm text-xs transition-colors duration-1000 dark:text-white font-mono'}
                                        value={head}
                                        disabled='disabled'
                                        highlight={head => highlight(head, languages.js)}
                                        padding={10}
                                    />
                                    <Editor
                                        className={'md:text-base text-sm transition-colors duration-1000 dark:text-white dark:bg-gray-700 bg-gray-50 rounded font-mono'}
                                        value={body? body : ''}
                                        autoFocus
                                        placeholder='Вводите сюда...'
                                        onValueChange={body => setBody(body)}
                                        highlight={body => highlight(body, languages.js)}
                                        padding={10}
                                    />
                                    <Editor
                                        className={'md:text-sm text-xs transition-colors duration-1000 dark:text-white font-mono'}
                                        value={foot}
                                        disabled='disabled'
                                        highlight={foot => highlight(foot, languages.js)}
                                        padding={10}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                    <div className={`w-full md:w-1/2`}>
                        <div className={'flex h-12 rounded-t-2xl transition-colors duration-1000 dark:bg-gray-900 bg-gray-800 items-center px-4 justify-between'}>
                            <div className="flex space-x-1.5">
                                <span className="w-3 h-3 border-2 border-transparent rounded-full bg-red-400"></span>
                                <span className="w-3 h-3 border-2 border-transparent rounded-full bg-yellow-400"></span>
                                <span className="w-3 h-3 border-2 border-transparent rounded-full bg-green-400"></span>
                            </div>
                        </div>
                        <div className={`w-auto min-h-[352px] rounded-b-2xl transition-colors duration-1000 dark:bg-gray-800 font-mono bg-white text-base dark:text-white`}>
                            <div className={'relative p-8'}>
                                <span className={'absolute text-xs text-gray-400 top-2 left-2'}>html</span>
                                <div className={'border-2 border-dashed dark:border-white p-6 h-full rounded relative'}>
                                    {head && parse(head)}
                                    <span className={'absolute text-xs text-gray-400 top-2 left-2'}>body</span>
                                        <div className={'border-2 p-8 border-solid md:text-base text-xs rounded border-emerald-400 relative'}>
                                            <span className={'absolute text-xs text-gray-400 top-2 left-2'}>content</span>
                                            {body
                                                ? parse(body)
                                                : <div className={'font-mono md:text-base text-sm transition-colors duration-1000 dark:text-gray-600 text-gray-500 cursor-default'}>Здесь будут отображаться результаты ввода...</div>
                                            }
                                        </div>
                                    {foot && parse(foot)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
               <Pagination lessons={lessons} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
            </div>
    )
}

export default Lesson;