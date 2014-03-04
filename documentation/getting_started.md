#Getting started with Markeng

This tutorial explains how to get started to use Markeng



## Markeng root

Markeng root is a folder from which markeng is executed. This convention is used throught the tutorial.



## Create markeng.json

The markeng.json file contains the configuration for the markeng project. The markeng checks for this file at the begining to make sure it is a valid markeng root. 

The file can be used to configure the protject title, home page and the external resources that must be loaded in all view of markeng.

Here is an example configuration file with all the variables.

```
{
    "title": "My first Markeng Project",
    "home_page": "home",
    "externalJS":[
        "//ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js"
    ],
    "externalCSS":[
        "http://fonts.googleapis.com/css?family=Lato:300,400,700,900"
    ]
}
```



## Create the pages directory and the home page directory

The markeng redirects to the home page configured in the markeng.json file when you browse to the / in the markeng server. So the first step would be to create the pages directory and the home page directory.

The pages are accessed from "pages" directory in the markeng root. To create some content to the home page create "pages/home" directory in markeng root. And inside that create a file named index.html. This file need not have full HTML tree starting form &lt;html&gt;. You can just start from the contents inside the &lt;body&gt; tag. Let us start with a plain H1 header and some paragraph text inside a container div.

```
<div class="container">
	<h1>First Project</h1>
	<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus, blanditiis eius deleniti dolorum nam laborum beatae qui adipisci nobis sapiente? Possimus, ipsa, quidem repellat ipsum ut ipsam aut cumque in.</p>
</div>
```

Now this page can be viewed in markeng after you start the server.



## Starting Markeng

Markeng is distrubuted as a node package and is executed from the command line. To start markeng on a project, open the command promt and change the working directory to markeng root. Make sure markeng is installed in your system. ([Installation Help](http://markeng.openly.io/install))
```
markeng -p {{port}}
```

You can specify any port in which markeng can run. You can also run multiple instances of markeng in different ports. If you do not specify a "-p {{port}}" option markeng will start on port 3000 by default. The rest of the urls in this document will use port 3000. If you are running markeng in a different port, please change the urls accordingly.

Alternatively you can also run markeng from any directory, and specify markeng root as a parameter. Example

```
markeng -p {{port}} -d {{markeng_root}}
```

Once markeng is started, you can brose through your markeng project in the browser at 

```
http://localhost:3000
```

This will redirect to the default home page of markeng. You can also list all the pages that are curretly available in the markeng project at

```
http://localhost:3000/pages
```


## Viewing your page

The url for a page in markeng is `http://localhost:3000/p/{{page}}`, where {{page}} is the name of the page you want to access. For example, you can see the contents of the home page explained in this example at 

```
http://localhost:3000/p/home
```

The page will have all valid prefix and postfix tags along with the contents in `pages/home/index.html`. Makeng will insert the html, head and body tags around the contents of the page. You can modify the contents of the head section also if you need to. (Detailed instructions ar[Modifying the header](http://markeng.openly.co/doc/header))

## Adding CSS

